/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faThLarge,
  faThList,
  faCopy,
  faCut,
  faClipboard,
  faHdd,
  faCamera,
  faUserFriends,
  faStar,
  faTrashAlt,
  faBars,
  faSearch,
} from '@fortawesome/free-solid-svg-icons';

import ProgressBar from '../../components/ProgressBar';
import SearchAssistant from '../../components/SearchAssistant';
import RecentItem from '../../components/RecentItem';
import FileBlock from '../../components/FileBlock';
import ContextMenu from '../../components/ContextMenu';

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedEntry: [],
      isGrid: false,
      navOpen: false,
      sa_modal: false,
      contextPosition: { x: 100, y: 100 },
      contextVisible: false,
    };
  }

  closeSearchAssistant = () => {
    this.setState({ sa_modal: false });
  };

  openSearchAssistant = () => {
    this.setState({ sa_modal: true });
  };

  openContextMenu = (position) => {
    const { x, y } = position;
    this.setState({
      contextPosition: { x, y },
      contextVisible: true,
    });
  };

  closeContextMenu = () => {
    this.setState({
      contextVisible: false,
    });
  };

  gridChange = () => {
    const { isGrid } = this.state;
    this.setState({
      isGrid: !isGrid,
    });
  };

  collapseNav = () => {
    this.setState({
      navOpen: !this.state.navOpen,
    });
  };

  selectEntry = (entry, isRemove) => {
    const { selectedEntry } = this.state;
    if (!isRemove) {
      selectedEntry.push(entry);
    } else {
      const index = selectedEntry.indexOf(entry);
      if (index !== -1) selectedEntry.splice(index, 1);
    }
    this.setState({
      selectedEntry,
    });
  };

  render() {
    const recent = {
      name: 'phongcanh.jpg',
      type: 'image',
      thumbmail: 'http://dulichnhanhnhat.com/wp-content/uploads/2017/08/23/05/ISDRM.jpg',
      size: '2 MB',
    };
    const recentAudio = {
      name: 'hello.mp3',
      type: 'audio',
      size: '9 MB',
    };
    const recentFile = {
      name: 'chuong1.pdf',
      type: 'pdf',
      size: '32 MB',
    };
    return (
      <div className="app-page">
        <ContextMenu
          opened={this.state.contextVisible}
          closeContextMenu={this.closeContextMenu}
          position={this.state.contextPosition}
        />

        <div data-opened={this.state.navOpen} className="sidebar">
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
            <li className="me-hidden-mobile" onClick={this.openSearchAssistant}>
              {' '}
              <span className="icon">
                <FontAwesomeIcon icon={faSearch} />
              </span>
              Search
            </li>
            <li>
              {' '}
              <span className="icon">
                <FontAwesomeIcon icon={faCamera} />
              </span>
              Photos
            </li>
            <li>
              {' '}
              <span className="icon">
                <FontAwesomeIcon icon={faUserFriends} />
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
                width: '100%',
              }}
            />
          </div>
        </div>
        <div className="app-main">
          <SearchAssistant close={this.closeSearchAssistant} opened={this.state.sa_modal} />
          <div id="header" className="block flex">
            <div onClick={this.collapseNav} className="app-nav-icon me-hidden-desktop">
              <FontAwesomeIcon icon={faBars} />
            </div>
            <h1>uFile Drive</h1>
            <div className="action-group">
              <span onClick={this.gridChange} role="presentation" className="me-mini-btn">
                {this.state.isGrid ? <FontAwesomeIcon icon={faThList} /> : <FontAwesomeIcon icon={faThLarge} />}
              </span>
              <span onClick={this.openSearchAssistant} className="me-mini-btn me-hidden-desktop">
                <FontAwesomeIcon icon={faSearch} />
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
          <div className="path-breadcrumb block">folder1 &gt; folder2 &gt; folder3</div>
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
              <div className={this.state.isGrid ? 'file-list grid' : 'file-list list'}>
                <div className="recent">
                  <div className="flex-row">
                    <RecentItem data={recent} />
                    <RecentItem data={recentFile} />
                    <RecentItem data={recentAudio} />
                    <RecentItem data={recent} />
                  </div>
                </div>
                <div className="flex header">
                  <div className="name">Name</div>
                  <div className="type">Type</div>
                  <div className="date">Date</div>
                  <div className="size">Size</div>
                </div>
                <FileBlock
                  selectFile={this.selectEntry}
                  openContextMenu={this.openContextMenu}
                  data={{
                    id: 1,
                    name: 'a.pdf',
                  }}
                />
                <FileBlock
                  selectFile={this.selectEntry}
                  openContextMenu={this.openContextMenu}
                  data={{
                    id: 2,
                    name: 'hinhanh.png',
                  }}
                />
              </div>

              <div className="notibar">
                <div className="noti-tab">
                  <span>Activity</span>
                  <span>Detail</span>
                </div>
                <div className="noti tab">
                  <div className="noti-item">Cuong added new file to your folder</div>
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
