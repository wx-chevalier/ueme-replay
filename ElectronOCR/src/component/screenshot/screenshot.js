/**
 * Created by apple on 16/6/24.
 */


import React, {PropTypes, Component} from "react";
import ScreenCapture from "./capture/capture";

export default class ScreenShot extends Component{

    constructor() {
        super();
    }

    render() {
        return (<section>
            <ScreenCapture/>
        </section>);
    }

}