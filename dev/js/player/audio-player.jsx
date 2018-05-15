import React, {Component} from 'react';

import * as SVG from "../components/svgs";

export class AudioPlayer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isPlaying: false,
            audios: props.playList,
            duration: null,
            currentKey: -1,
            time: 0,
            volume: 1,
        };
    }

    /**
     * in short this is a secondary constructor
     */
    componentDidMount() {
        //interval for audio positions update
        this.currentTimeInterval = null;
        //volume to start default
        this.audio.volume = this.state.volume;
        //binding fu
        setTimer = setTimer.bind(this);

        // Get duration of the song and set it as max slider value
        this.audio.onloadedmetadata = function () {
            this.setState({duration: this.audio.duration});
        }.bind(this);

        //when the bit drops
        this.audio.onplay = () => {
            setTimer();
        };

        //audio is ended playing
        this.audio.onended = () => {
            if (this.state.audios.length > 1) {
                this.setState(prev => {
                    prev.currentKey = (prev.currentKey + 1) % prev.audios.length;
                    this.ulList.scrollTop = prev.currentKey * 16;

                    return prev;
                });
            }
            else {
                this.audio.currentTime = 0;
                this.setState({time: 0})
            }
        };

        //we stop the timer, just for kicks
        this.audio.onpause = () => {
            clearInterval(this.currentTimeInterval);
        };

        /**
         * Sync slider position with song current time
         */
        function setTimer() {
            this.currentTimeInterval = setInterval(() => {
                this.setState({time: this.audio.currentTime});

                this.setCompleteValue(this.audio.currentTime);
            }, 500);
        }
    }

    /**
     * this way is faster then via render
     * @param value
     */
    setCompleteValue(value) {
        let completeValue = value / this.state.duration;

        //bad bad code. The solution would be to further customise slider
        let fix = completeValue < 0.7 ? " + 2px" : "";

        this.complete.style.width = `calc((100% - 10px) * ${completeValue}${fix})`;
    }

    /**
     * handle items in playlist
     */
    handleItemClick(key) {
        this.setState(prev => {
            prev.isPlaying = true;
            prev.currentKey = key;
            prev.time = 0;
            this.audio.currentTime = 0;
            //this.audio.play();
            return prev;
        });
        this.setCompleteValue(0);
    }

    handleSlider(event) {
        let {value, name} = event.target;
        switch (name) {
            case "duration":
                this.setState({time: value});
                this.audio.currentTime = value;
                this.setCompleteValue(value);
                break;

            case "volume":
                this.setState({volume: value});
                this.audio.volume = value;
                break;
        }
    }

    handleNextClick() {
        this.setState(prev => {
            prev.currentKey = (prev.currentKey + 1) % prev.audios.length;
            prev.time = 0;
            this.audio.currentTime = 0;
            this.ulList.scrollTop = prev.currentKey * 16;
            return prev;
        })
    }


    handlePrevClick() {
        this.setState(prev => {
            if (prev.currentKey === 0) {
                prev.currentKey = prev.audios.length
            }
            prev.currentKey--;
            prev.time = 0;
            this.audio.currentTime = 0;
            this.ulList.scrollTop = prev.currentKey * 16;
            return prev;
        });
    }

    handlePlayPauseClick() {
        let isAudioSelected = this.state.currentKey >= 0;
        if (!isAudioSelected) {
            //делаем это в отдельной компандой сет что б успела затася запись прежде чем начнет проигрываться
            this.setState(prev => {
                prev.currentKey = 0;
                prev.isPlaying = true;
                return prev;
            });
        }
        else
            this.setState(prev => {
                if (prev.isPlaying) {
                    this.audio.pause();
                }
                else {
                    this.audio.play();
                }
                prev.isPlaying = !prev.isPlaying;
                return prev;
            })
    }

    render() {

        let {isPlaying, audios, currentKey, time, duration, volume} = this.state;

        let isAudioSelected = currentKey >= 0;
        let src = isAudioSelected ? audios[currentKey].path : "";

        let hasPlaylist = audios.length > 1;
        let timeStr = createPlayerDuration(time, duration);

        return (
            <div className="audio-player">
                {/*audio is hidden and is set to auto play, for easier start*/}
                <audio hidden src={src}
                       ref={audio => this.audio = audio}
                       autoPlay={isPlaying}/>

                {hasPlaylist &&
                <button className="button"
                        disabled={!isAudioSelected}
                        onClick={this.handlePrevClick.bind(this)}>
                    <SVG.Previews/>
                </button>
                }

                <button className="button"
                        onClick={this.handlePlayPauseClick.bind(this)}>
                    {isPlaying ?
                        <SVG.Pause/>
                        :
                        <SVG.Play/>
                    }
                </button>

                {hasPlaylist &&
                <button className="button"
                        disabled={!isAudioSelected}
                        onClick={this.handleNextClick.bind(this)}>
                    <SVG.Next/>
                </button>
                }

                {/*slider for setting volume*/}
                <div className="button volume range">
                    <SVG.Volume width={volume * 100}/>
                    <input type="range"
                           name="volume"
                           onChange={this.handleSlider.bind(this)}
                           value={volume}
                           min="0" max={1} step={0.1}/>
                </div>

                {/*slider for position of current playing audio*/}
                <div className="slider range">
                    <input type="range"
                           name="duration"
                           disabled={!isAudioSelected}
                           onChange={this.handleSlider.bind(this)}
                           value={time}
                           min="0" max={duration}/>
                    <div className={"complete"}
                         ref={complete => this.complete = complete}
                        // style={{width: `calc((100% - 10px) * ${complete})`}}
                    />
                </div>

                {/*here we have current time in playing audio*/}
                <div className={"time"}>
                    {timeStr}
                </div>

                {/*displays playlist of audios*/}
                {hasPlaylist &&
                <ul ref={ul => this.ulList = ul}>
                    {
                        audios.map((item, i) =>
                            <li key={i}
                                onClick={this.handleItemClick.bind(this, i)}
                                className={i === currentKey ? "current" : ""}>
                                {(item.name || `Аудио запись ${i + 1}`)}
                            </li>
                        )
                    }
                </ul>
                }
            </div>
        );
    }
}

function createPlayerDuration(time, duration) {
    let _time = createTimeString(time);
    let _duration = createTimeString(duration);
    return `${_time}/${_duration}`;
}

function createTimeString(time) {
    let _time = {
        minutes: parseInt(time / 60, 10),
        seconds: parseInt(time % 60)
    };

    return `${AddZero(_time.minutes)}:${AddZero(_time.seconds)}`;

    /**
     * @return {string}
     */
    function AddZero(value) {
        return (value < 10 ? "0" : "") + value;
    }
}