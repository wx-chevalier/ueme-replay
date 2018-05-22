/**
 * Created by apple on 16/6/3.
 */
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

// const pkg = require('./package.json');
// const deps = Object.keys(pkg.dependencies);
// const devDeps = Object.keys(pkg.devDependencies);
//
// const archs = ['ia32', 'x64'];
// const platforms = ['linux', 'win32', 'darwin'];
// platforms.forEach(plat => {
//     archs.forEach(arch => {
//         pack(plat, arch, log(plat, arch));
//     });
// });
//
//
// const DEFAULT_OPTS = {
//     dir: './',
//     name: "ElectronOCR",
//     asar: true,
//     ignore: [
//         '^/test($|/)',
//         '^/tools($|/)',
//         '^/release($|/)',
//         '^/main.development.js'
//     ].concat(devDeps.map(name => `/node_modules/${name}($|/)`))
//         .concat(
//             deps.filter(name => false)
//                 .map(name => `/node_modules/${name}($|/)`)
//         )
// };
//
// function pack(plat, arch, cb) {
//     // there is no darwin ia32 electron
//     if (plat === 'darwin' && arch === 'ia32') return;
//
//     const iconObj = {
//         icon: "assets/icon" + (() => {
//             var extension = '.ico';
//             if (plat === 'darwin') {
//                 extension = '.icns';
//             } else if (plat === 'win32') {
//                 extension = '.ico';
//             }
//             return extension;
//         })()
//     };
//
//     const opts = Object.assign({}, DEFAULT_OPTS, iconObj, {
//         appPath:"./",
//         platform: plat,
//         arch,
//         prune: true,
//         overwrite: true,//允许复写
//         download: {
//             mirror: "https://npm.taobao.org/mirrors/electron/"
//         },
//         'app-version': "0.0.1",
//         out: `release/${plat}-${arch}`
//     });
//
//     packager(opts, cb);
// }
//
//
// function log(plat, arch) {
//     return (err, filepath) => {
//         if (err) return console.error(err);
//         console.log(`${plat}-${arch} finished!`);
//     };
// }