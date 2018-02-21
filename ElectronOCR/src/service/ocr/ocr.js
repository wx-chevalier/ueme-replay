/**
 * Created by apple on 16/6/3.
 */
window.require('shelljs/global');
const tesseract = require('./tesseract.js');
const Promise = require("es6-promise").Promise;

const tesseract_options = {
    l: 'chi_sim+eng',
    psm: 6,
    binary: '/usr/local/bin/tesseract'
};

/**
 * @function 用于图片识别OCR服务
 */
export class OCRService {

    imageRecognize(imageSrc) {

        return new Promise((resolve, reject)=> {

            // Recognize text of any language in any format
            tesseract.process(imageSrc, tesseract_options, function (err, text) {
                if (err) {
                    console.log(err);
                    reject(err);
                } else {
                    resolve(text)
                }
            });
        });
    }

    /**
     * @function 判断当前Tesseract环境是否稳定
     * @private
     */
    _isTesseractValid() {

        console.log(which('tesseract'));
        console.log(which('convert'));

        if (!which('tesseract') || !which('convert')) {


            return false;

            // var result = confirm("检测到您缺少必要环境,是否需要安装?");
            //
            // if (result) {
            //     //帮助安装环境
            //     if (exec('brew install imagemagick').code !== 0 || exec('brew install tesseract --all-languages').code !== 0) {
            //         alert('安装失败!');
            //         exit(1);
            //     }
            // } else {
            //     exit(1);
            // }
        }
        return true;
    }


}