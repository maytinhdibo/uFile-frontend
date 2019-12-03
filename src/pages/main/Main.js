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
  faEnvelopeOpenText,
  faEllipsisV,
  faCheckSquare,
  faShare,
  faTimes,
  faSquare,
} from '@fortawesome/free-solid-svg-icons';

import ProgressBar from '../../components/ProgressBar';
import Breadcumb from '../../components/home/Breadcrumb';
import SearchAssistant from '../../components/SearchAssistant';
import RecentItem from '../../components/RecentItem';
import FileBlock from '../../components/FileBlock';
import ContextMenu from '../../components/ContextMenu';
import Activity from 'components/home/Activity';
import Viewer from 'pages/viewer/Viewer';

import { Link } from 'react-router-dom';
import Modal from 'components/common/Modal';

import '../../styles/popup.scss';
import RenamePopup from 'components/home/RenamePopup';
import { alertText } from 'components/common/Alert';

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedEntry: [],
      isGrid: false,
      navOpen: false,
      notiOpen: false,
      isTouchSelector: false,
      sa_modal: false,
      ex_menu: false,
      contextPosition: { x: 100, y: 100 },
      contextVisible: false,
      modalViewer: false,
      //rename popup
      renamePopup: false,
      //context
      isContextFolder: false,
      //mouse
      mouseState: 'UP',
      mousePos: {
        top: 0,
        left: 0,
        right: 'auto',
        bottom: 'auto',
      },
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.match.params.path != this.props.match.params.path) {
      alert(this.props.match.params.path);
    }
    // if(prevProps.)
  }

  closeSearchAssistant = () => {
    this.setState({ sa_modal: false });
  };

  openSearchAssistant = () => {
    this.setState({
      sa_modal: true,
      navOpen: false,
    });
  };

  openExtendMenu = () => {
    this.setState({ ex_menu: true });
  };

  openContextMenu = (position, isFolder) => {
    const { x, y } = position;
    this.setState({
      contextPosition: { x, y },
      contextVisible: true,
      isContextFolder: isFolder
    });
  };

  //folder context menu
  folderMenu = evt => {
    this.openContextMenu({ x: evt.clientX, y: evt.clientY }, true)
    evt.preventDefault();
  };

  closeContextMenu = () => {
    this.setState({
      contextVisible: false,
    });
  };

  openNoti = () => {
    this.setState({
      notiOpen: true,
      navOpen: false,
    });
  };

  closeNoti = () => {
    this.setState({ notiOpen: false });
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

  handerEntryTouch = () => {
    this.setState({ isTouchSelector: !this.state.isTouchSelector });
  };

  wrapperClick = () => {
    if (this.state.ex_menu) {
      this.setState({ ex_menu: false });
    }
  };

  closeViewerModal = () => {
    this.setState({
      modalViewer: false,
    });
  };

  //mouse event

  mouseMove = evt => {
    if (this.state.mouseState == 'DOWN') {
      console.log(evt);
      this.setState({
        mousePos: {
          top: this.state.mousePos.top,
          left: this.state.mousePos.left,
          right: 1057 - evt.pageX + 'px',
          bottom: 758 - evt.pageY + 'px',
        },
      });
    }
  };

  mouseDown = evt => {
    this.setState({ mouseState: 'DOWN' });
    this.setState({
      mousePos: {
        top: evt.pageY + 'px',
        left: evt.pageX + 'px',
        right: 'auto',
        bottom: 'auto',
      },
    });
  };

  mouseUp = evt => {
    this.setState({ mouseState: 'UP' });
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
      <div onClick={this.wrapperClick} className="app-page">
        {this.state.modalViewer ? <Viewer modal={true} closeModal={this.closeViewerModal} /> : null}

        <RenamePopup onClose={() => this.setState({ renamePopup: false })} visible={this.state.renamePopup} />

        <ContextMenu
          isFolder={this.state.isContextFolder}
          opened={this.state.contextVisible}
          closeContextMenu={this.closeContextMenu}
          position={this.state.contextPosition}
          onRename={() => this.setState({ renamePopup: true })}
        />

        <div data-opened={this.state.navOpen} className="sidebar">
          <div className="account">
            <span className="profile-picture" />
            Cuong Tran
            <ul>
              <Link to="/account">
                <li>Account</li>
              </Link>
              <li>Terms of service</li>
              <li>Logout</li>
            </ul>
          </div>

          <div
            onClick={() => {
              this.setState({ modalViewer: true });
            }}
            className="upload"
          >
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
              <span className="icon">
                <FontAwesomeIcon icon={faSearch} />
              </span>
              Search
            </li>
            <li className="me-display-mobile-sm" onClick={this.openNoti}>
              <span className="icon">
                <FontAwesomeIcon icon={faEnvelopeOpenText} />
              </span>
              Notification
            </li>
            <Link to="/main/photos">
              <li>
                <span className="icon">
                  <FontAwesomeIcon icon={faCamera} />
                </span>
                Photos
              </li>
            </Link>
            <li
              onClick={() => {
                alertText('Just test message');
              }}
            >
              <span className="icon">
                <FontAwesomeIcon icon={faUserFriends} />
              </span>
              Shared with me
            </li>
            <li>
              <span className="icon">
                <FontAwesomeIcon icon={faStar} />
              </span>
              Favorites
            </li>
            <li>
              <span className="icon">
                <FontAwesomeIcon icon={faTrashAlt} />
              </span>
              Trash
            </li>
          </ul>

          <div className="storage">
            <h3>Storage</h3>
            <p className="info">5.4GB of 15GB used</p>

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

              <span className="me-h-seperate me-hidden-mobile" />

              <span className="me-mini-btn me-hidden-mobile">
                <FontAwesomeIcon icon={faCut} />
              </span>
              <span className="me-mini-btn me-hidden-mobile">
                <FontAwesomeIcon icon={faCopy} />
              </span>
              <span className="me-mini-btn" disabled>
                <FontAwesomeIcon icon={faClipboard} />
              </span>

              <span className="me-h-seperate me-hidden-mobile" />

              <span className="me-mini-btn me-hidden-mobile">
                <FontAwesomeIcon icon={faStar} />
              </span>
              <span className="me-mini-btn me-hidden-mobile">
                <FontAwesomeIcon icon={faShare} />
              </span>

              <span onClick={this.openExtendMenu} className="me-mini-btn me-hidden-desktop">
                <FontAwesomeIcon icon={faEllipsisV} />
              </span>

              <div
                className={
                  this.state.ex_menu ? 'me-extend-menu me-hidden-desktop opened' : 'me-extend-menu me-hidden-desktop'
                }
              >
                <div onClick={this.handerEntryTouch} className="item">
                  <span className="icon">
                    {this.state.isTouchSelector ? (
                      <FontAwesomeIcon style={{ color: '#349af0' }} icon={faCheckSquare} />
                    ) : (
                      <FontAwesomeIcon style={{ color: '#ccc' }} icon={faSquare} />
                    )}
                  </span>
                  <span>Select item</span>
                </div>
                <div className="item">
                  <span style={{ marginLeft: '-2px' }} className="icon">
                    <FontAwesomeIcon icon={faStar} />
                  </span>
                  <span>Add folder to favorites</span>
                </div>
                <div className="item">
                  <span style={{ marginLeft: '-2px' }} className="icon">
                    <FontAwesomeIcon icon={faShare} />
                  </span>
                  <span>Share this folder</span>
                </div>
              </div>
            </div>
          </div>
          <Breadcumb />
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
                onContextMenu={evt => this.folderMenu(evt)}
                className={this.state.isGrid ? 'file-list grid' : 'file-list list'}
              >
                <div className="recent">
                  <div className="flex-row">
                    <RecentItem data={recent} />
                    <RecentItem data={recentFile} />
                    <RecentItem data={recentAudio} />
                    <RecentItem data={recent} />
                  </div>
                </div>
                {/* <div
                  onMouseMove={evt => this.mouseMove(evt)}
                  onMouseDown={evt => this.mouseDown(evt)}
                  onMouseUp={evt => this.mouseUp(evt)}
                  className="file-div"
                >
                  {this.state.mouseState == 'DOWN' ? (
                    <div style={this.state.mousePos} className="faker-selector"></div>
                  ) : null} */}

                <div className="flex header">
                  <div className="name">Name</div>
                  <div className="type">Type</div>
                  <div className="date">Date</div>
                  <div className="size">Size</div>
                </div>
                <FileBlock
                  selectFile={this.selectEntry}
                  openContextMenu={this.openContextMenu}
                  isTouchSelector={this.state.isTouchSelector}
                  data={{
                    id: 1,
                    name: 'a.pdf',
                  }}
                />
                <FileBlock
                  selectFile={this.selectEntry}
                  isTouchSelector={this.state.isTouchSelector}
                  openContextMenu={this.openContextMenu}
                  data={{
                    id: 2,
                    name: 'hinhanh.png',
                  }}
                />
                <FileBlock
                  selectFile={this.selectEntry}
                  isTouchSelector={this.state.isTouchSelector}
                  openContextMenu={this.openContextMenu}
                  data={{
                    id: 2,
                    name: 'hinhanh.png',
                  }}
                />

                <FileBlock
                  selectFile={this.selectEntry}
                  isTouchSelector={this.state.isTouchSelector}
                  openContextMenu={this.openContextMenu}
                  data={{
                    id: 2,
                    name: 'hinhanh.png',
                  }}
                />
                <FileBlock
                  selectFile={this.selectEntry}
                  isTouchSelector={this.state.isTouchSelector}
                  openContextMenu={this.openContextMenu}
                  data={{
                    id: 2,
                    name: 'hinhanh.png',
                  }}
                />
                <FileBlock
                  selectFile={this.selectEntry}
                  isTouchSelector={this.state.isTouchSelector}
                  openContextMenu={this.openContextMenu}
                  data={{
                    id: 2,
                    name: 'hinhanh.png',
                  }}
                />
                <FileBlock
                  selectFile={this.selectEntry}
                  isTouchSelector={this.state.isTouchSelector}
                  openContextMenu={this.openContextMenu}
                  data={{
                    id: 2,
                    name: 'hinhanh.png',
                  }}
                />
                <FileBlock
                  selectFile={this.selectEntry}
                  isTouchSelector={this.state.isTouchSelector}
                  openContextMenu={this.openContextMenu}
                  data={{
                    id: 2,
                    name: 'hinhanh.png',
                  }}
                />
                <FileBlock
                  selectFile={this.selectEntry}
                  isTouchSelector={this.state.isTouchSelector}
                  openContextMenu={this.openContextMenu}
                  data={{
                    id: 2,
                    name: 'hinhanh.png',
                  }}
                />
                <FileBlock
                  selectFile={this.selectEntry}
                  isTouchSelector={this.state.isTouchSelector}
                  openContextMenu={this.openContextMenu}
                  data={{
                    id: 2,
                    name: 'hinhanh.png',
                  }}
                />
              </div>
              {/* </div> */}

              <Activity notiOpen={this.state.notiOpen} closeNoti={this.closeNoti} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Main;
