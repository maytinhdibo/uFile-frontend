import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import bytes from 'bytes';

import '../../styles/viewer.scss';
import Media from './Media';
import Office from './Office';

import { faInfoCircle, faShare, faTimes, faChevronRight, faDownload } from '@fortawesome/free-solid-svg-icons';
import Zip from './Zip';

export default class Viewer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      openDetail: false,
    };
  }
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
          <b>{this.props.modal ? this.props.file.name : 'filename.mp4'}</b>
          <div className="tools">
            <span>
              <FontAwesomeIcon icon={faDownload} />
            </span>
            <span
              onClick={() => {
                this.setState({ openDetail: true });
              }}
            >
              <FontAwesomeIcon icon={faInfoCircle} />
            </span>
            {/* <span>
              <FontAwesomeIcon icon={faShare} />
            </span> */}
          </div>
        </header>

        <div className="viewer-block">
          {/* mp3, mp4, ogg */}
          {/* <Media src="https://www.w3schools.com/html/mov_bbb.mp4" /> */}
          {/* <Media src="https://www.w3schools.com/TagS/horse.ogg" type="audio"/> */}

          {/* office for docx, doc, ppt, pptx, xls, xlsx*/}
          {/* <Office src="https://easychair.org/publications/easychair.docx" /> */}

          {/*txt, pdf*/}
          {/* <iframe src=""></iframe> */}

          {/*Image*/}
          {/* <img className="viewer" src="https://analyticsindiamag.com/wp-content/uploads/2019/07/image_rec_lib_banner.jpg"/> */}

          {/*Zip*/}
          <Zip
            data={[
              {
                name: 'hello',
                isFolder: true,
              },
              {
                name: 'a.mp4',
                isFolder: false,
              },
            ]}
          />
        </div>

        <div
          style={{
            right: this.state.openDetail ? 0 : '-100%',
          }}
          className="info"
        >
          <header>
            <div className="tools">
              <span
                onClick={() => {
                  this.setState({ openDetail: false });
                }}
              >
                <FontAwesomeIcon icon={faChevronRight} />
              </span>
              <b>&nbsp;Details</b>
            </div>
          </header>
          <table>
            <tr>
              <th>Create at:</th>
              <td>12/11/2019 8:23</td>
            </tr>
            <tr>
              <th>Size:</th>
              <td>{bytes(123443, { decimalPlaces: 0 })}</td>
            </tr>
            <tr>
              <th>File type:</th>
              <td>document/PDF</td>
            </tr>
            <tr>
              <th>Location:</th>
              <td>Drive/Shared with me</td>
            </tr>
            <tr>
              <th>Owner:</th>
              <td>Hoang Bao Long</td>
            </tr>
          </table>
        </div>
      </div>
    );
  }
}
