import React from 'react';
import ProgressBar from '../../components/ProgressBar';

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isGrid: true
    };
  }

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
          <button
            onClick={() =>
              this.setState({
                isGrid: !this.state.isGrid
              })}
          >
AHihi

          </button>
          <div className="filebrowser">
            <div className="explore">
              <div
                className={
                  this.state.isGrid ? 'file-list grid' : 'file-list list'
                }
              >
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
