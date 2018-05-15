import ReactDOM from "react-dom";
import React, {Component} from 'react';

import {AudioPlayer} from "./audio-player";

/**
 * creates player in transferred DOM element
 * @param props contains list of audio files
 * @param domEl element in which we place player
 */
window.createPlayer = (props, domEl) => {
    ReactDOM
        .render(
            <AudioPlayer {...props} />,
            domEl
        );
};