import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import convert from 'convert-seconds';

import Fullscreen from 'react-full-screen';

import '../../styles/viewer.scss';
import Media from './Media';
import { faInfoCircle, faShare, faTimes } from '@fortawesome/free-solid-svg-icons';

export default class Viewer extends React.Component {
  render() {
    return (
      <div className="me-viewer">
        <header>
          {this.props.modal ? (
            <div className="tools">
              <span onClick={this.props.closeModal}>
                <FontAwesomeIcon icon={faTimes} />
              </span>
            </div>
          ) : null}
          <b>filename.mp4</b>
          <div className="tools">
            <span>
              <FontAwesomeIcon icon={faInfoCircle} />
            </span>
            <span>
              <FontAwesomeIcon icon={faShare} />
            </span>
          </div>
        </header>
        <Media src="https://www.w3schools.com/html/mov_bbb.mp4" />
        {/* <Media src="https://www.w3schools.com/TagS/horse.ogg" type="audio"/> */}
      </div>
    );
  }
}
