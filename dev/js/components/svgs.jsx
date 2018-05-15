/**
 * file with svg images
 */
import React, {Component} from 'react';

export function Play() {
    return (
        <svg width="22.5" height="27" viewBox="0 0 22.5 27">
            <polygon data-name="play" fill="#47cdff" points="0 27 22.5 13.5 0 0 0 27"/>
        </svg>
    );
}

export function Pause() {
    return (
        <svg width="22.5" height="27" viewBox="0 0 22.5 27">
            <path data-name="pause" fill="#47cdff" d="M0,0H9V27H0ZM13.5,0h9V27h-9Z"/>
        </svg>
    );
}

export function Previews() {
    return (
        <svg width="27" height="27" viewBox="0 0 27 27">
            <path id="back-2" data-name="back" fill="#47cdff" d="M9,16.2V10.8L27,0V27ZM9,0H0V27H9Z"/>
        </svg>
    );
}

export function Next() {
    return (
        <svg width="27" height="27" viewBox="0 0 27 27">
            <path id="next-2" data-name="next" fill="#47cdff" d="M18,10.8v5.4L0,27V0ZM18,27h9V0H18Z"/>
        </svg>
    );
}

export function Volume(props) {
    let {width} = props;
    return (
        <svg width="54" height="27" viewBox="0 0 54 27">
            <defs>
                <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" style={{stopColor:"#47cdff", stopOpacity:1}} />
                    <stop offset={width + "%"} style={{stopColor:"#47cdff", stopOpacity:1}} />
                    <stop offset={(width+1) + "%"} style={{stopColor:"#66697a", stopOpacity:1}} />
                    <stop offset="100%" style={{stopColor:"#66697a", stopOpacity:1}} />
                </linearGradient>
            </defs>
            <path data-name="sound" fill="url(#grad1)"
                  d="M0,20.25H9V27H0ZM11.25,16.2h9V27h-9ZM22.5,10.8h9V27h-9ZM33.75,5.4h9V27h-9ZM45,0h9V27H45Z"/>
        </svg>
    )
}