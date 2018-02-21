/**
 * Created by apple on 16/6/3.
 */
/**
 * Created by apple on 16/5/9.
 */
import React from "react";
import {render} from "react-dom";
import {AppComponent} from "./container/app.js";

window.$ = window.jQuery = require('jquery');

render(
    <AppComponent/>
    , document.getElementById('root')
);
