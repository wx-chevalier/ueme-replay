/**
 * Created by apple on 16/6/15.
 */

/**
 * @function 国际化信息配置类
 */
export default class i18n {

    static instance = null;

    /**
     * @function 默认构造函数
     * @returns {*}
     */
    constructor() {

        if (!i18n.instance) {

            i18n.instance = this;

            //配置当前的en文字
            this.en = {
                button: {
                    open: "Open File or Directory"
                },
                message: {}
            };

            //配置当前的zh文字
            this.zh = {
                button: {
                    open: "打开文件或文件夹"
                },
                message: {}
            };

            this.current = this.en;

        }

        return i18n.instance;

    }

    /**
     * @function 进行配置选择
     */
    configure({lang="en"}) {

        if(lang === "zh"){
            this.current = this.zh
        }else {
            this.current = this.en;
        }

    }
}