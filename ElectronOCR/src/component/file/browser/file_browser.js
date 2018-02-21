/**
 * Created by apple on 16/6/3.
 */

import React, {PropTypes, Component} from "react";
import {FileSystemService} from "../../../service/file_system/file_system";
import {Carousel, Button, message, Modal} from "antd";
import {OCRService} from "../../../service/ocr/ocr";
import i18n from "../../../app/config/i18n";
import ScreenShot from "../../screenshot/screenshot";
var Slider = require('react-slick');
const fileSystemService = new FileSystemService();
const ocrService = new OCRService();
require("./file_browser.scss");
const path = window.require("path");

const i18nInstance = new i18n();

export class FileBrowserComponent extends Component {

    /**
     * @function 构造函数
     */
    constructor(props) {

        super(props);

        this.state = {
            imageFiles: [path.resolve("./assets/images/screenshot/screenshot-en.png")],
            current: 0,//当前的图片
            processing: false,
            capture_window: false
        };

        this._handleOpenFileClick = this._handleOpenFileClick.bind(this);

        this._handleOCRClick = this._handleOCRClick.bind(this);
    }

    /**
     * @function 默认渲染函数
     * @returns {XML}
     */

    _handleOpenFileClick() {

        fileSystemService.openImageFiles().then(
            (imageFiles)=> {

                this.setState({imageFiles: imageFiles});

            }
        ).catch();
    }

    /**
     * @function 处理OCR的点击事件
     * @private
     */
    _handleOCRClick() {


        //设置正在处理
        this.setState({processing: true});

        let currentImageSrc = this.state.imageFiles[this.state.current];

        ocrService.imageRecognize(currentImageSrc).then((text)=> {

            console.log(text);

            //为了方便,暂时先使用这个全局查询哈
            let ele = document.querySelector("#file-content-text");

            ele.innerHTML = text;

            //设置当前处理完毕
            this.setState({processing: false});


        }).catch(()=> {
            //请不要使用默认的网络图片或者确保已经安装好了Tesseract!
            message.error('Please dont use online image or enable Tesseract!');
            this.setState({processing: false});

        });

    }

    /**
     * @function 处理系统截图
     * @private
     */
    _handleCaptureClick() {

    }

    /**
     * @function 渲染图片文件
     * @returns {Array}
     * @private
     */
    _renderImageFiles() {

        var result = [];

        this.state.imageFiles.forEach((imageFile, index)=> {

            result.push(
                <div className="image-item" onClick={()=>{console.log(index)}} style={{
                    backgroundImage:`url(${imageFile})`
                }}>
                </div>
            );
        });

        return result;
    }

    render() {

        return (
            <section className="file_browser_container">

                <div className="file-operation">

                    <Button type="primary"
                            icon="search"
                            className="file-operation__open-btn"
                            onClick={this._handleOpenFileClick}
                            disabled={this.state.processing}
                    >{i18nInstance.current.button.open}</Button>

                    <Button type="primary"
                            icon="scan"
                            className="file-operation__capture-btn"
                            onClick={()=>{this.setState({capture_window:true})}}
                            disabled={this.state.processing}
                    >{"Use Screen Capture"}</Button>

                </div>

                <Carousel afterChange={(current)=>{
                    this.setState({current});
                }}>
                    {this._renderImageFiles()}
                </Carousel>

                <section className="image-operation">
                    <Button type="primary"
                            icon="unlock"
                            onClick={this._handleOCRClick}
                            loading={this.state.processing}
                    >
                        OCR By Tesseract
                    </Button>
                </section>

                <Modal title="Pick One ScreenShot"
                       visible={this.state.capture_window}
                       width={800}
                       onCancel={()=>{this.setState({capture_window:false})}}
                       footer={[]}

                >
                    <ScreenShot/>

                </Modal>
            </section>
        );
    }


}
