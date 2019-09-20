import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faThLarge,
  faThList,
  faCopy,
  faCut,
  faClipboard,
  faHdd,
  faPhotoVideo,
  faUniversalAccess,
  faStar,
  faTrashAlt
} from '@fortawesome/free-solid-svg-icons';

import ProgressBar from '../../components/ProgressBar';

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isGrid: false
    };
  }

  gridChange = () => {
    this.setState({
      isGrid: !this.state.isGrid
    });
  };

  render() {
    return (
      <div className="app-page">
        <div className="sidebar">
          <div className="account">
            <span className="profile-picture" />
            Cuong Tran
          </div>

          <div className="upload">
            <button type="button">Upload new file</button>
          </div>
          <ul>
            <li>
              <span className="icon">
                <FontAwesomeIcon icon={faHdd} />
              </span>
              My drive
            </li>
            <li>
              {' '}
              <span className="icon">
                <FontAwesomeIcon icon={faPhotoVideo} />
              </span>
              Photos
            </li>
            <li>
              {' '}
              <span className="icon">
                <FontAwesomeIcon icon={faUniversalAccess} />
              </span>
              Shared with me
            </li>
            <li>
              {' '}
              <span className="icon">
                <FontAwesomeIcon icon={faStar} />
              </span>
              Favorites
            </li>
            <li>
              {' '}
              <span className="icon">
                <FontAwesomeIcon icon={faTrashAlt} />
              </span>
              Trash
            </li>
          </ul>

          <div className="storage">
            <h3>Storage</h3>
            <br />
            <ProgressBar
              value={0.4}
              style={{
                width: '100%'
              }}
            />
          </div>
        </div>
        <div className="app-main">
          <div className="block flex">
            <h1>uFile Drive</h1>
            <div className="action-group">
              <span
                onClick={this.gridChange}
                role="presentation"
                className="me-mini-btn"
              >
                {this.state.isGrid ? (
                  <FontAwesomeIcon icon={faThList} />
                ) : (
                  <FontAwesomeIcon icon={faThLarge} />
                )}
              </span>
              <span className="me-mini-btn">
                <FontAwesomeIcon icon={faCut} />
              </span>
              <span className="me-mini-btn">
                <FontAwesomeIcon icon={faCopy} />
              </span>
              <span className="me-mini-btn" disabled>
                <FontAwesomeIcon icon={faClipboard} />
              </span>
            </div>
          </div>
          <div className="path-breadcrumb block">
            folder1 &gt; folder2 &gt; folder3
          </div>
          {/* <button
            onClick={() =>
              this.setState({
                isGrid: !this.state.isGrid
              })}
          >
AHihi

          </button> */}

          <div className="filebrowser">
            <div className="explore">
              <div
                className={
                  this.state.isGrid ? 'file-list grid' : 'file-list list'
                }
              >
                <div className="recent">
                  <div className="flex-row">
                    <div className="recent-item" />
                    <div className="recent-item" />
                  </div>
                  <div className="flex-row">
                    <div className="recent-item" />
                    <div className="recent-item" />
                  </div>
                </div>
                <div className="flex header">
                  <div className="name">Name</div>
                  <div>Type</div>
                  <div>Date</div>
                  <div>Size</div>
                </div>
                <label className="file-block" htmlFor="item-0">
                  <input id="item-0" type="checkbox" />
                  <div className="file-item">
                    <div className="name">
                      <span className="entry-icon" />
                      <span className="entry-name">birthday.png</span>
                    </div>
                    <div className="type">Image</div>
                    <div className="date">14/07/2019</div>
                    <div className="size">30 MB</div>
                  </div>
                </label>
                <label className="file-block" htmlFor="item-1">
                  <input id="item-1" type="checkbox" />
                  <div className="file-item">
                    <div className="name">
                      <span className="entry-icon" />
                      <span className="entry-name">birthday.png</span>
                    </div>
                    <div className="type">Image</div>
                    <div className="date">14/07/2019</div>
                    <div className="size">30 MB</div>
                  </div>
                </label>
                <label className="file-block" htmlFor="item-2">
                  <input id="item-2" type="checkbox" />
                  <div className="file-item">
                    <div className="name">
                      <span className="entry-icon" />
                      <span className="entry-name">birthday.png</span>
                    </div>
                    <div className="type">Image</div>
                    <div className="date">14/07/2019</div>
                    <div className="size">30 MB</div>
                  </div>
                </label>
                <label className="file-block" htmlFor="item-0">
                  <input id="item-0" type="checkbox" />
                  <div className="file-item">
                    <div className="name">
                      <span className="entry-icon" />
                      <span className="entry-name">birthday.png</span>
                    </div>
                    <div className="type">Image</div>
                    <div className="date">14/07/2019</div>
                    <div className="size">30 MB</div>
                  </div>
                </label>
              </div>

              <div className="notibar">
                <span>Activity</span>
                <span>Detail</span>
                <div className="noti tab">
                  <div className="noti-item">
                    Cuong added new file to your folder
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Main;
