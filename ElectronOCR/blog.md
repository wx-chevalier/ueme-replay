> [Github Repo 地址](https://github.com/wxyyxc1992/ElectronOCR)
> [文章地址]()
> [MAXOS Darwin x64下载](https://github.com/wxyyxc1992/ElectronOCR/raw/master/dist/ElectronOCR.zip)



> 笔者一直在MacOS上没找到太顺心的OCR工具,导致看书的时候很多东西只能手打,略烦。正好前段时间用了Tesseract,就用Electron封装了一个,这里简要记述下开发当中的一些坑和要点,日后有空把Electron整理好也出个系列

# Introduction

这东西,大概是这个样子:
![](https://raw.githubusercontent.com/wxyyxc1992/ElectronOCR/master/assets/images/screenshot/screenshot-hdfs.png)

现在本机上安装个Tesseract:
```
brew install imagemagick
brew install tesseract --all-languages
```
然后直接下载打开即可。

## Development

### Setup

- use `npm install` or `npm link` to install dependences
- use `npm install -g electron-prebuilt` to enable the global electron

### Develop & Hot-Reloading

- use `npm start` to start webpak hot-middle server
- use `npm run electron-test` to use electron and set env to development

### Package

- use `npm run build`to generate list file for web modules
- use`npm run package-osx` to build and package into dmg

# Web部分

笔者Web部分还是采用Webpack+React+Redux(待加入)，关于这部分的单独代码可以借鉴[我的Webpack套装](https://segmentfault.com/a/1190000005122575)以及[**Webpack-React-Redux-Boilerplate**](https://github.com/wxyyxc1992/Webpack-React-Redux-Boilerplate)这个示范Boilerplate。需要注意的是，在Electron 1.x之后API和0.x系列有了较大的变化，很多Github上的项目在升级到1.2.0之后不可用。

## jQuery引入问题

```
if ( typeof module === "object" && typeof module.exports === "object" ) {
  // set jQuery in `module`
} else {
  // set jQuery in `window`
}
```
jQuery的源代码中有如下定义,因为Electron实际上定义了module,导致window中没有挂载上$或者jQuery,修复方式如下:
```
<html>
<head>
    <title>MyApp</title>
    <link rel="stylesheet" type="text/css" href="./lib/w2ui-1.4.3.css"/>
    <script type="text/javascript" src="./lib/require.js"></script>
    <script type="text/javascript" src="./lib/jquery-2.1.4.js" onload="$ = jQuery = module.exports;"></script>
    <script type="text/javascript" src="./lib/w2ui-1.4.3.js"></script>
</head>
<body>
<script type="text/javascript">
    // use global $ and w2ui here... 
    ...
```

## 支持Hot Reload的环境搭建

Electron实际上是一个封装好的近似浏览器，因此Hot Reload与纯粹的Web开发区别不大，都是先起一个Hot Load Server，监听3000端口。不过需要做修改的是，在Electron中所有的脚本都要从localhost:3000加载，主要修改有：

```javascript
var devEntry = [
    'eventsource-polyfill',
    //修改WHM的默认加载地址
    `webpack-hot-middleware/client?path=http://localhost:${port}/__webpack_hmr`,
];
//修改默认的公共路径前缀
config.output.publicPath = `http://localhost:${port}/dist/`//公共目录名
```

在dev.html中也需要修改下加载的脚本的地址：

```html
<html>
<head>
    <title>Index For Debug</title>
    <meta http-equiv="content-type" content="text/html; charset=UTF-8" />
</head>
<body>
<div id="root"></div>
</body>
</html>
<script src="http://localhost:3000/dist/vendors.bundle.js"></script>
<script src="http://localhost:3000/dist/main.bundle.js"></script>
```

## 在渲染进程中引入本地模块

```
const {dialog} = window.require('electron').remote;
const fs = window.require("fs");
```

首先为了避免Webpack在打包时报错`electron`不存在，建议是将所有Node或者Electron提供的模块用`window.require`方式，这样Webpack会忽略引入。

# Native部分

## 创建本地窗口

```javascript
/**
 * Created by apple on 16/6/3.
 */
const electron = require('electron');
// 用于控制应用生命周期
const {app} = electron;
// 用于创建本地窗口
const {BrowserWindow} = electron;

//为Window对象创建一个全局的引用,否则可能被JavaScript的垃圾回收机制自动回收
let win;

/**
 * @function 创建窗口
 */
function createWindow() {
    // 创建类似于浏览器的窗口
    win = new BrowserWindow({width: 800, height: 600});

    // 加载应用入口文件,本文件为测试文件,因此加载的是测试
    win.loadURL(`file://${__dirname}/dist/app.html`);

    // 启动调试工具,如果是开发环境下则不需要开启
    // win.webContents.openDevTools();

    // 设置窗口关闭事件
    win.on('closed', () => {
        //因为上面是设置了一个全局引用,因此这里需要对该对象解除引用
        //如果你的应用支持打开多窗口,可以把所有的引用存入一个数组中,然后在这里动态删除
        win = null;
    });
}

// 在基本环境准备好之后的回调
app.on('ready', createWindow);

// 所有窗口都关闭之后的回调
app.on('window-all-closed', () => {
    //在OSX中经常是用户虽然关闭了主窗口,但是仍然希望使用Menu Bar,因此这里不进行强行关闭
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

// 应用被重新激活之后的回调
app.on('activate', () => {
    // 在Dock中的Menu Bar被点击之后重新激活应用
    if (win === null) {
        createWindow();
    }
});

```



## 打包

一般来说，Electron推荐的打包方式有三种，这里笔者使用的是`electron-packager`这个便捷工具，不过碰到一个蛋疼的问题是Electron一直下载不下来，挂了SS加上proxychains4都不行。因此最终还是用编程方式进行打包：

```
require('babel-polyfill');
const exec = require('child_process').exec;

const argv = require('minimist')(process.argv.slice(2));

const platform = argv._[0];//编译的目标平台

const packager = require('electron-packager');

console.log("Current NODE_ENV = " + process.env.NODE_ENV);//判断编译时环境

const arch = "x64";

packager({
    dir: "./",
    platform,
    arch,
    out: `release/`,
    override: true,
    prune: true,
    download: {
        mirror: "https://npm.taobao.org/mirrors/electron/" //设定Electron的下载地址
    }
}, function done_callback(err, appPaths) { /* … */
});
```

然后将脚本封装到package.json中：

```
"package-osx": "npm run clean-electron && NODE_ENV=production node -r babel-register package.js darwin",
```



### 避免打包node_modules

在Web开发中我们会将譬如React、Redux等等依赖项加入到package.json的dependencies中，不过Electron Packager会将node_modules也打包到应用中。然后代码都已经通过Webpack打包编译到统一的js脚本中，因此首先可以设置`prune`为true，这样可以避免打包所有的dev-dependencies。同样，我们也需要将非本地模块全部放到dev-dependencies中。