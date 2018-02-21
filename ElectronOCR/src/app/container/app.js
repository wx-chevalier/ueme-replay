/**
 * Created by apple on 16/6/3.
 */
import React, {PropTypes, Component} from "react";
import {FileBrowserComponent} from "../../component/file/browser/file_browser";
import {FileContentComponent} from "../../component/file/content/file_content";
require("antd/dist/antd.min.css");
require("normalize.css/normalize.css");
require("./app.scss");

/**
 * @function
 */
export class AppComponent extends Component {

    render() {
        return (<div className="app_container">
            <header>

            </header>

            <section className="middle">
                <section className="left">
                    <FileBrowserComponent/>
                </section>
                <section className="right">
                    <FileContentComponent/>
                </section>
            </section>

            <footer>

            </footer>
        </div>)
    }
}