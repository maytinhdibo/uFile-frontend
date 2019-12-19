import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import convert from 'convert-seconds';

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

export default class Office extends React.Component {
  render() {
    return (
        <iframe className="viewer" src={"https://view.officeapps.live.com/op/embed.aspx?src="+this.props.src}></iframe>
    );
  }
}
