# ElectronOCR
Cute OCR Toolkits For OSX, Based On Electron,React&amp;Tesseract

![](https://raw.githubusercontent.com/wxyyxc1992/ElectronOCR/master/assets/images/screenshot/screenshot-hdfs.png)


## Download

- [MAXOS Darwin x64](https://github.com/wxyyxc1992/ElectronOCR/raw/master/dist/ElectronOCR.zip)

# Usage

建议先本机安装下Tesseract,安装时间较长,请耐心等待:
Recommend installing tesseact manually:

```
brew install imagemagick
brew install tesseract --all-languages
```

你可以使用如下方式进行测试:
```
convert input.png -resize 400% -type Grayscale input.tif
tesseract -l eng+chi_sim input.tif output
```
然后直接打开应用即可。

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

# RoadMap

- Add Support For Shotcut:添加桌面截图功能
- Add ImageMagic For Improving Quality:添加一些图片预处理以增加准确率
- Add Cache:添加图片识别内容缓存
- Add Focused Image:添加焦点图方式查看图片
- Add Tesseract Installer:优化Tesseract下载
- Add i18n:添加国际化支持
- Use Redux For State Management:添加Redux作为状态管理,放比较后面主要是这个不是关键因素
- Optimize the display of text, add markdown/coding support:优化文本显示
- Add Fantastic Image Carousel:添加更酷炫的走马灯效果