/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import ProgressBar from '../../components/ProgressBar';

class Main extends React.Component {
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
            <li>My drive</li>
            <li>Photos</li>
            <li>Shared with me</li>
            <li>Favorites</li>
            <li>Trash</li>
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
          <header>Home</header>
          <div className="filebrowser">
            <div className="explore">
              <div className="file-list">
                List file Recent
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
                <div className="file-item">
                  <div className="name">birthday.png</div>
                  <div>Image</div>
                  <div>14/07/2019</div>
                  <div>30 MB</div>
                </div>
                <div className="file-item">
                  <div className="name">birthday.png</div>
                  <div>Image</div>
                  <div>14/07/2019</div>
                  <div>30 MB</div>
                </div>
                <div className="file-item">
                  <div className="name">birthday.png</div>
                  <div>Image</div>
                  <div>14/07/2019</div>
                  <div>30 MB</div>
                </div>
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
