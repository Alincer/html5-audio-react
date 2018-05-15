import React, {Component} from 'react';

export class Range extends Component {
    constructor(props) {
        super(props);

        this.state = props;
    }

    redner() {
        let {duration, value} = this.state;

        return (
            <div className={"slider"}>
                <input type="range" min={0} max={duration} value={value}/>
                <div className={"range-slider"}>
                    <div className={"range-slider-fill"} />
                    <div className={"range-slider-thumb"} />
                </div>
            </div>
        );
    }
}