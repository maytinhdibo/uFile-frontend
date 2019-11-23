import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import convert from 'convert-seconds';

import Fullscreen from 'react-full-screen';

import {
  faChevronRight,
  faPlayCircle,
  faVolumeUp,
  faExpand,
  faPauseCircle,
  faVolumeMute,
  faCompress,
} from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

import '../../styles/viewer.scss';

class Slider extends React.Component {
  render() {
    const { props } = this;
    return (
      <div className="slider-wapper">
        <div
          style={{
            width: props.value + '%',
          }}
          className="value"
        ></div>
        <input
          onChange={evt => this.props.onChange(evt)}
          value={props.value}
          type="range"
          min={0}
          max={100}
          class="slider"
        />
      </div>
    );
  }
}

export default class Media extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isPlaying: false,
      duration: 0,
      currentTime: 0,
      isFull: false,
      volume: 1,
    };
  }

  goFull = () => {
    this.setState({ isFull: !this.state.isFull });
  };

  onPlay = () => {
    if (this.state.isPlaying) {
      this.refs.video.pause();
    } else {
      this.refs.video.play();
    }
    this.setState({ isPlaying: !this.state.isPlaying });
  };
  convertTime(timeBySecond) {
    const time = convert(timeBySecond);
    var times = [];
    var { hours, minutes, seconds } = time;

    if (hours >= 10) {
      times.push(hours);
    } else if (hours > 0) {
      times.push('0' + hours);
    }

    if (minutes >= 10) {
      times.push(minutes);
    } else {
      times.push('0' + minutes);
    }

    if (seconds >= 10) {
      times.push(seconds);
    } else {
      times.push('0' + seconds);
    }

    return times.join(':');
  }
  render() {
    return (
      <Fullscreen enabled={this.state.isFull} onChange={isFull => this.setState({ isFull })}>
        <div type={this.props.type} className={this.state.isFull ? 'video-wrapper fullscreen' : 'video-wrapper'}>
          <video
            onEnded={() => {
              this.setState({ isPlaying: false });
            }}
            onLoadedMetadata={evt => {
              this.setState({
                duration: evt.target.duration,
              });
              this.refs.video.volume = 1;
            }}
            onTimeUpdate={evt => {
              this.setState({
                currentTime: evt.target.currentTime,
              });
            }}
            ref="video"
            src={this.props.src}
          />

          <div className="controls">
            <div onClick={this.onPlay} style={{ width: '40px' }} className="control btn">
              <FontAwesomeIcon icon={this.state.isPlaying ? faPauseCircle : faPlayCircle} />
            </div>

            <div style={{ padding: '0 7px 0 7px' }} className="control">
              {this.convertTime(this.state.currentTime)}
            </div>

            <div style={{ flex: '1' }} className="control">
              <Slider
                value={(this.state.currentTime / this.state.duration) * 100}
                onChange={evt => {
                  this.refs.video.currentTime = (evt.target.value / 100) * this.state.duration;
                }}
              />
            </div>

            <div style={{ padding: '0 7px 0 7px' }} className="control">
              {this.convertTime(this.state.duration)}
            </div>

            <div style={{ width: '75px', padding: '0 7px 0 7px' }} className="control">
              <span style={{ marginRight: '7px' }}>
                <FontAwesomeIcon icon={this.state.volume == 0 ? faVolumeMute : faVolumeUp} />
              </span>
              <Slider
                value={this.state.volume * 100}
                onChange={evt => {
                  this.refs.video.volume = evt.target.value / 100;
                  this.setState({ volume: evt.target.value / 100 });
                }}
              />
            </div>

            <div onClick={this.goFull} style={{ width: '40px' }} className="control btn">
              <FontAwesomeIcon icon={this.state.isFull ? faCompress : faExpand} />
            </div>
          </div>
        </div>
      </Fullscreen>
    );
  }
}
