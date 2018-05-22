/**
 * Created by apple on 16/6/23.
 */
const {desktopCapturer} = window.require('electron');

import React, {PropTypes, Component} from "react";
require("./capture.scss");
/**
 * @显示全部的截屏获得的图片
 */
export default class ScreenCapture extends Component {


    constructor() {

        super();

        this._getSources = this._getSources.bind(this);

    }

    /**
     * @functio 调用本地屏幕捕获
     * @param cb
     * @private
     */
    _getSources(cb) {

        //捕获频幕截图
        desktopCapturer.getSources({
            types: ['window', 'screen'],
            thumbnailSize: {width: 1000, height: 1000}
        }, function (error, sources) {
            for (let source of sources) {
                console.log("Name: " + source.name);
            }
            cb(sources);
        });

    }

    /**
     * 组件挂载完毕之后的回调
     */
    componentDidMount() {

        //获取到Select对象
        const $captureSelect = $("#capture-select");

        //获取到Sources
        this._getSources((sources)=> {
            sources.forEach((source)=> {

                $captureSelect.append($('<option>', {
                    value: source.id.replace(":", ""),
                    text: source.name

                }));

                $('#capture-select option[value="' + source.id.replace(":", "") + '"]').attr('data-img-src', source.thumbnail.toDataURL());

            });

            $captureSelect.imagepicker({
                hide_select: true,
                clicked: function (e, i) {

                    $(".image_picker_selector .selected").removeClass("selected");

                    console.log(e);
                }
            });

        });


    }

    /**
     * @function 默认渲染函数
     */
    render() {
        return (<section className="capture-container">
            <select
                id="capture-select"
                className="image-picker show-html">
            </select>
        </section>);
    }

}