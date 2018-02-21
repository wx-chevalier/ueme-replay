/**
 * Created by apple on 16/6/3.
 */
var _ = require('lodash');
const {dialog} = window.require('electron').remote;
const fs = window.require("fs");
const Promise = require('es6-promise').Promise;
const path = window.require("path");


/**
 * @function 文件系统以及辅助类
 */
export class FileSystemService {

    constructor() {

        //支持的图片类型
        this.SupportedImageExtensions = ['png', 'jpg', 'jpeg', 'bmp', 'gif', 'tiff', 'tif'];

        this.openImageFiles = this.openImageFiles.bind(this);

        this._getDirectoryImageFiles = this._getDirectoryImageFiles.bind(this);

        this._isSupportedImageFile = this._isSupportedImageFile.bind(this);
    }

    /**
     * @function 打开文件
     * @returns Promise 异步返回{Array} 返回所有打开的图片路径,数组形式
     */
    openImageFiles() {

        return new Promise((resolve, reject)=> {

            //存放打开的所有图片文件的路径
            let images = [];

            // TODO: Refactor this... code duplication
            dialog.showOpenDialog({
                    properties: [
                        'openFile',
                        'openDirectory'
                    ],
                    filters: [
                        {
                            name: 'Images',
                            extensions: this.SupportedImageExtensions
                        }
                    ]
                },
                (fileName) => {
                    if (fileName) {
                        //判断打开的是单个图片还是文件夹
                        fileName = fileName + ''; // convert to string

                        var stat = fs.lstatSync(fileName);

                        if (stat.isDirectory()) {

                            //如果打开的是文件夹
                            images = images.concat(this._getDirectoryImageFiles(fileName));

                        } else {
                            //如果打开的是一个图片
                            images.push(fileName);
                        }

                        resolve(images);

                    } else {

                        reject(new Error());
                    }
                });
        });


    }

    /**
     * @function 获取某个目录下包含的所有图片文件
     * @param dir
     * @returns {Array} 图片文件列表
     */
    _getDirectoryImageFiles(dir) {

        let files = fs.readdirSync(dir);

        let fullFilePaths = _.map(files, function (fileName) {
            return path.join(dir, fileName);
        });

        return _.filter(fullFilePaths, this._isSupportedImageFile);
    }

    /**
     * @region 判断是否是支持的文件类型
     */

    _isSupportedImageFile(file) {

        var extension = path.extname(file);

        if (extension) {
            extension = extension.slice(1); // remove the dot

            extension = extension.toLowerCase();

            return this.SupportedImageExtensions.indexOf(extension) !== -1;
        }

        // no extension
        return false;
    }

}