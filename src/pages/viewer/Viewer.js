import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import convert from 'convert-seconds';

import Fullscreen from 'react-full-screen';

import '../../styles/viewer.scss';
import Media from './Media';
import { faInfoCircle, faShare } from '@fortawesome/free-solid-svg-icons';


export default class Viewer extends React.Component {
  render() {
    return (
      <div
        className="me-viewer"
      >
        <header>
          <b>filename.mp4</b>
          <div className="tools">
            <span><FontAwesomeIcon icon={faInfoCircle}/></span>
            <span><FontAwesomeIcon icon={faShare}/></span>
          </div>
        </header>
       <Media src="https://www.w3schools.com/html/mov_bbb.mp4"/>
       {/* <Media src="https://www.w3schools.com/TagS/horse.ogg" type="audio"/> */}
      </div>
    );
  }
}
