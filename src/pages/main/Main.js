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
  faArrowUp,
  faArrowDown,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';

import ProgressBar from '../../components/ProgressBar';
import Breadcumb from '../../components/home/Breadcrumb';
import SearchAssistant from '../../components/SearchAssistant';
import RecentItem from '../../components/RecentItem';
import FileBlock from '../../components/FileBlock';
import ContextMenu from '../../components/ContextMenu';
import Activity from 'components/home/Activity';
import Nothing from 'components/home/Nothing';
import Viewer from 'pages/viewer/Viewer';

import { Link, NavLink } from 'react-router-dom';
import Modal from 'components/common/Modal';

import '../../styles/popup.scss';
import RenamePopup from 'components/home/RenamePopup';
import { alertText } from 'components/common/Alert';
import NewFolderPopup from 'components/home/NewFolderPopup';
import SharePopup from 'components/home/SharePopup';

//services
import userServices from '../../services/users';
import folderServices from '../../services/folders';
import fileServices from '../../services/files';

import { canView } from '../../helpers/fileViewer';
import Loader from 'components/Loader';
import bytes from 'bytes';

const files = [
  {
    id: '3-CB7492200A4A465FBBD1ACC837A69023',
    name: 'a.pdf',
    size: 100000,
    updated_at: '2015-03-04T00:00:00.000Z',
  },
  {
    id: 2,
    name: 'hinha.nh.png',
    thumbnail: 'http://truyenxuatichcu.com/medias/articles/img/2017/11/di-tich-chua-mot-cot.jpg',
    size: 575303000,
    updated_at: '2017-08-04T00:00:00.000Z',
  },
  {
    id: 3,
    name: 'hinhanh.doc',
    size: 33,
    updated_at: '2019-02-03T00:00:00.000Z',
  },
  {
    id: 9,
    name: 'hinhanh.rar',
    size: 3567893,
    updated_at: '2019-02-03T00:00:00.000Z',
  },
  {
    isFolder: true,
    id: 4,
    name: 'hinhanh',
    size: 30,
    updated_at: '2015-03-04T00:00:00.000Z',
  },
];

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedEntry: [],
      clipboard: {
        type: '',
        data: [],
      },
      uploadProcess: -1,
      isGrid: false,
      navOpen: false,
      notiOpen: false,
      isTouchSelector: false,
      sa_modal: false,
      ex_menu: false,
      contextPosition: { x: 100, y: 100 },
      contextVisible: false,
      modalViewer: false,
      //file
      isViewing: null,
      //rename popup
      renamePopup: false,
      //new folder popup
      newFolderPopup: false,
      sharePopup: false,
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
      //
      sortBySize: 0,
      sortByName: 0,
      sortByDate: 0,
      entryData: files,
      editableEntry: true,
      isStar: false,
      parse_path: [],
      loading: false,
      pageFolder: 1,
      loadEnd: false,
      rootSize: 0,
      isDraging: false,
      recentFiles:[]
    };
  }

  scrollMore = event => {
    var node = event.target;
    const bottom = node.scrollHeight - node.scrollTop === node.clientHeight;
    if (bottom && !this.state.loading && !this.state.loadEnd) {
      this.loadFolder(true);
      console.log('BOTTOM REACHED:', bottom);
    }
  };

  loadFolder = async loadMore => {
    if (loadMore) {
      let { pageFolder } = this.state;
      await this.setState({
        // selectedEntry: [],
        // entryData: [],
        loading: true,
        pageFolder: ++pageFolder,
      });
    } else {
      await this.setState({
        selectedEntry: [],
        entryData: [],
        loading: true,
        pageFolder: 1,
        loadEnd: false,
      });
    }

    var folderData = [];

    if (this.isPhotoFolder() || this.isFavFolder() || this.isTrashFolder() || this.isSharedFolder()) {
      await fileServices
        .searchDetails({
          only_photo: this.isPhotoFolder(),
          star: this.isFavFolder(),
          trash: this.isTrashFolder(),
          share: this.isSharedFolder(),
          basic_info: false,
          _limit: 12,
          _page: this.state.pageFolder,
        })
        .then(data => {
          console.log(data);
          folderData = data.result.files;
          if (data.result.files.length < 12) this.setState({ loadEnd: true });
        });
      this.setState({ editableEntry: false, loading: false });
    } else {
      await folderServices
        .getDetails({
          folder_id: this.props.match.params.path == 'home' ? localStorage.user_id : this.props.match.params.path,
          _limit: 12,
          _page: this.state.pageFolder,
        })
        .then(data => {
          folderData = data.children_details;
          this.setState({ parse_path: data.parse_urls, editableEntry: data.editable, isStar: !!data.star });
          if (data.children_details.length < 12) this.setState({ loadEnd: true });
        });
    }

    folderData = folderData.map(item => {
      return {
        id: item.file_id,
        name: item.file_title,
        type: item.file_type,
        size: item.size,
        stared: item.star,
        isFolder: item.file_type == 'folder',
        updated_at: item.updated_at,
        thumbnail: item.thumbnail_url ? 'http://112.137.129.216:5000/api/download/thumbnail/' + item.file_id : false,
      };
    });

    if (loadMore) {
      let moreData = this.state.entryData;
      folderData = moreData.concat(folderData);
    }

    this.setState({ entryData: folderData, loading: false });

    // await folderServices.getDetails({ folder_id: '3' }).then(data => {
    //   console.log(data);
    // });
  };

  logout = () => {
    userServices.submitLogoutRequest().then(data => {
      localStorage.clear();
      this.props.history.push('/');
    });
  };

  removeSortState() {
    this.setState({
      sortBySize: 0,
      sortByName: 0,
      sortByDate: 0,
    });
  }

  sortBySize() {
    let sortBySize = this.state.sortBySize;
    if (sortBySize == 0) sortBySize = 1;
    else sortBySize = -sortBySize;
    this.removeSortState();
    this.setState({ sortBySize });
    this.setState({ entryData: this.state.entryData.sort((a, b) => (a.size < b.size ? sortBySize : -sortBySize)) });
  }

  sortByName() {
    let sortByName = this.state.sortByName;
    if (sortByName == 0) sortByName = 1;
    else sortByName = -sortByName;
    this.removeSortState();
    this.setState({ sortByName });
    this.setState({ entryData: this.state.entryData.sort((a, b) => a.name.localeCompare(b.name) * sortByName) });
  }

  sortByDate() {
    let sortByDate = this.state.sortByDate;
    if (sortByDate == 0) sortByDate = 1;
    else sortByDate = -sortByDate;
    this.removeSortState();
    this.setState({ sortByDate });
    this.setState({
      entryData: this.state.entryData.sort((a, b) => (new Date(b.updated_at) - new Date(a.updated_at)) * sortByDate),
    });
  }

  componentDidMount() {
    this.loadFolder();
    fileServices
      .searchDetails({
        file_id: localStorage.user_id,
      })
      .then(data => {
        this.setState({ rootSize: data.result.files[0].size });
      });

    fileServices
      .searchDetails({
        only_photo: true,
        _limit: 4,
      })
      .then(data => {
        this.setState({ recentFiles: 
        
     data.result.files.map(item => {
      return {
        id: item.file_id,
        name: item.file_title,
        type: item.file_type,
        size: item.size,
        stared: item.star,
        isFolder: item.file_type == 'folder',
        updated_at: item.updated_at,
        thumbnail: item.thumbnail_url ? 'http://112.137.129.216:5000/api/download/thumbnail/' + item.file_id : false,
      };
    })
        })
     });


  }

  componentDidUpdate(prevProps) {
    if (prevProps.match.params.path != this.props.match.params.path) {
      // alert(this.props.match.params.path);
      this.loadFolder();
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
      isContextFolder: isFolder,
    });
  };

  //folder context menu
  folderMenu = evt => {
    this.openContextMenu({ x: evt.clientX, y: evt.clientY }, true);
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

  //open detail

  openDetailTab = function() {};

  getInfo = () => {
    this.openNoti();
    this.openDetailTab();
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

  isTrashFolder = () => {
    return this.props.match.params.path == 'trash';
  };

  isPhotoFolder = () => {
    return this.props.match.params.path == 'photos';
  };

  isSharedFolder = () => {
    return this.props.match.params.path == 'shared-with-me';
  };

  isFavFolder = () => {
    return this.props.match.params.path == 'favorites';
  };

  uploadToFolder = evt => {
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      onUploadProgress: progressEvent => {
        console.log(progressEvent.loaded);
        this.setState({ uploadProcess: progressEvent.loaded / progressEvent.total });
      },
    };

    console.log(evt.target.files[0]);

    const formData = new FormData();
    formData.set('parent_id', this.folderParse());
    formData.append('in_file', evt.target.files[0]);

    fileServices.upload(formData, config).then(data => {
      this.setState({ uploadProcess: -1 });
      this.loadFolder();
    });
  };

  //entry action
  onOpen = dataEntry => {
    if (dataEntry.isFolder) {
      // alertText('Folder nè');
      this.props.history.push('/drive/' + dataEntry.id);
    } else if (canView(dataEntry.name)) {
      this.setState({
        modalViewer: true,
        isViewing: dataEntry,
      });
    } else {
      alertText('This file can not preview');
    }
  };

  folderParse = () => {
    if (this.isFavFolder() || this.isPhotoFolder() || this.isTrashFolder() || this.isSharedFolder()) return null;
    return this.props.match.params.path == 'home' ? localStorage.user_id : this.props.match.params.path;
  };

  clearTrash = () => {
    fileServices.clearTrash().then(() => {
      setTimeout(() => this.loadFolder(), 500);
    });
  };

  onPaste = () => {
    const data = this.state.clipboard.data.map(item => {
      return item.id;
    });
    if (this.state.clipboard.type == 'CUT') {
      fileServices
        .move({
          file_ids: data,
          new_parent: this.folderParse(),
        })
        .then(() => {
          this.loadFolder();
        });
    } else {
      fileServices
        .copy({
          file_ids: data,
          new_parent: this.folderParse(),
        })
        .then(() => {
          this.loadFolder();
        });
    }

    this.setState({
      clipboard: {
        type: 'NONE',
        data: [],
      },
    });
  };

  onCopy = () => {
    this.setState({
      clipboard: {
        type: 'COPY',
        data: this.state.selectedEntry,
      },
      selectedEntry: [],
    });
    alertText('Copied to clipboard');
  };

  onCut = () => {
    this.setState({
      clipboard: {
        type: 'CUT',
        data: this.state.selectedEntry,
      },
      selectedEntry: [],
    });
    alertText('Save to clipboard');
  };

  render() {
    const recent = {
      id: 1,
      name: 'phongcanh.jpg',
      type: 'image',
      thumbmail: 'http://dulichnhanhnhat.com/wp-content/uploads/2017/08/23/05/ISDRM.jpg',
      size: '2 MB',
    };
    const recentAudio = {
      id: 2,
      name: 'hello.mp3',
      type: 'audio',
      size: '9 MB',
    };
    const recentFile = {
      id: 3,
      name: 'chuong1.pdf',
      type: 'pdf',
      size: '32 MB',
    };

    return (
      <div onClick={this.wrapperClick} className="app-page">
        {this.state.modalViewer ? (
          <Viewer modal={true} file={this.state.isViewing} closeModal={this.closeViewerModal} />
        ) : null}

        <RenamePopup
          selectedEntry={this.state.selectedEntry.length >= 1 ? this.state.selectedEntry[0] : null}
          onClose={() => this.setState({ renamePopup: false })}
          visible={this.state.renamePopup}
          reloadFolder={this.loadFolder}
        />
        <NewFolderPopup
          reloadFolder={this.loadFolder}
          path={this.props.match.params.path}
          onClose={() => this.setState({ newFolderPopup: false })}
          visible={this.state.newFolderPopup}
        />

        <SharePopup
          selectedEntry={this.state.selectedEntry.length >= 1 ? this.state.selectedEntry[0] : null}
          onClose={() => this.setState({ sharePopup: false })}
          visible={this.state.sharePopup}
        />

        <ContextMenu
          isTrash={this.isTrashFolder()}
          isPhoto={this.isPhotoFolder()}
          isShared={this.isSharedFolder()}
          isFav={this.isFavFolder()}
          isFolder={this.state.isContextFolder}
          opened={this.state.contextVisible}
          closeContextMenu={this.closeContextMenu}
          position={this.state.contextPosition}
          getInfo={this.getInfo}
          onRename={() => this.setState({ renamePopup: true })}
          onNewFolder={() => this.setState({ newFolderPopup: true })}
          onShare={() => this.setState({ sharePopup: true })}
          onPaste={() => this.onPaste()}
          onCopy={() => this.onCopy()}
          onCut={() => this.onCut()}
          selectedEntry={this.state.selectedEntry}
          reloadFolder={this.loadFolder}
          clipboard={this.state.clipboard}
        />

        <div data-opened={this.state.navOpen} className="sidebar">
          <div className="account">
            <span
              style={{
                backgroundImage: 'url(' + localStorage.avatar_url + ')',
              }}
              className="profile-picture"
            />
            {localStorage.fullname}
            <ul>
              <Link to="/account">
                <li>Account</li>
              </Link>
              <li>Terms of service</li>
              <li onClick={this.logout}>Logout</li>
            </ul>
          </div>

          <div onClick={() => this.refs.uploadIp.click()} disabled={!this.state.editableEntry} className="upload">
            <button type="button">
              <span className="status">
                {this.state.uploadProcess >= 0
                  ? this.state.uploadProcess == 1
                    ? 'Processing...'
                    : 'Uploading ' + Math.round(this.state.uploadProcess * 100) + '%...'
                  : 'Upload new file'}
              </span>
              <span
                style={{
                  display: this.state.uploadProcess == -1 ? 'none' : 'block',
                  width: this.state.uploadProcess * 100 + '%',
                }}
                className="overlay"
              ></span>
            </button>

            <input onChange={evt => this.uploadToFolder(evt)} ref="uploadIp" type="file" />
          </div>
          <ul>
            <NavLink activeClassName="actived" to="/drive/home">
              <li>
                <span className="icon">
                  <FontAwesomeIcon icon={faHdd} />
                </span>
                My drive
              </li>
            </NavLink>

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
            <NavLink activeClassName="actived" to="/drive/photos">
              <li>
                <span className="icon">
                  <FontAwesomeIcon icon={faCamera} />
                </span>
                Photos
              </li>
            </NavLink>
            <NavLink activeClassName="actived" to="/drive/shared-with-me">
              <li>
                <span className="icon">
                  <FontAwesomeIcon icon={faUserFriends} />
                </span>
                Shared with me
              </li>
            </NavLink>
            <NavLink activeClassName="actived" to="/drive/favorites">
              <li>
                <span className="icon">
                  <FontAwesomeIcon icon={faStar} />
                </span>
                Favorites
              </li>
            </NavLink>
            <NavLink activeClassName="actived" to="/drive/trash">
              <li>
                <span className="icon">
                  <FontAwesomeIcon icon={faTrashAlt} />
                </span>
                Trash
              </li>
            </NavLink>

            {/* <button onClick={this.loadFolder}>reload</button> */}
          </ul>

          <div className="storage">
            <h3>Storage</h3>
            <p className="info">{bytes(this.state.rootSize, { decimalPlaces: 2 })} of 15GB used</p>

            <ProgressBar
              value={this.state.rootSize / (15 * 1024 * 1024 * 1024)}
              style={{
                width: '100%',
              }}
            />
          </div>
        </div>
        <div className="app-main">
          <SearchAssistant close={this.closeSearchAssistant} onOpen={this.onOpen} opened={this.state.sa_modal} />
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

              {!this.isTrashFolder() && !this.isPhotoFolder() && !this.isSharedFolder() && !this.isFavFolder() ? (
                <span>
                  <span className="me-h-seperate me-hidden-mobile" />

                  <span
                    onClick={this.onCut}
                    disabled={this.state.selectedEntry == 0}
                    className="me-mini-btn me-hidden-mobile"
                  >
                    <FontAwesomeIcon icon={faCut} />
                  </span>
                  <span
                    onClick={this.onCut}
                    disabled={this.state.selectedEntry == 0}
                    className="me-mini-btn me-hidden-mobile"
                  >
                    <FontAwesomeIcon icon={faCopy} />
                  </span>
                  <span onClick={this.onPaste} className="me-mini-btn" disabled={this.state.clipboard.data.length == 0}>
                    <FontAwesomeIcon icon={faClipboard} />
                  </span>
                </span>
              ) : null}

              {this.isTrashFolder() ? <span className="me-h-seperate me-hidden-mobile" /> : null}

              {/* {!this.isTrashFolder() && !this.isPhotoFolder() && !this.isSharedFolder() && !this.isFavFolder() ? (
                <span>
                  <span
                    style={{
                      color: this.state.isStar ? '#fcba03' : 'auto',
                    }}
                    className="me-mini-btn me-hidden-mobile"
                  >
                    <FontAwesomeIcon icon={faStar} />
                  </span>

                  <span className="me-mini-btn me-hidden-mobile">
                    <FontAwesomeIcon icon={faShare} />
                  </span>
                </span>
              ) : null} */}

              {this.isTrashFolder() ? (
                <span onClick={this.clearTrash} className="me-mini-btn">
                  <FontAwesomeIcon icon={faTrash} />
                </span>
              ) : null}

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
                {!this.isTrashFolder() && !this.isPhotoFolder() && !this.isSharedFolder() && !this.isFavFolder() ? (
                  <div>
                    {/* <div className="item">
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
                    </div> */}
                  </div>
                ) : null}
              </div>
            </div>
          </div>
          <Breadcumb parse_path={this.state.parse_path} path={this.props.match.params.path} />
          {/* [
              {
                id: '1',
                title: 'home',
              },
              {
                id: '1-64540B0D31204201897FEE5EAF1E6219',
                title: 'jhbkj',
              },
              {
                id: '1D2E638A32F684260B63B195BB7423E7B',
                title: 'srfd',
              },
            ] */}
          {/* <button
            onClick={() =>
              this.setState({
                isGrid: !this.state.isGrid
              })}
          >
AHihi

          </button> */}

          <div
            // onDragStart={()=>this.setState({isDraging:true})}
            // onDragOverCapture={()=>this.setState({isDraging:false})}
            style={{
              backgroundColor: this.state.isDraging ? '#543' : 'auto',
            }}
            className="filebrowser"
          >
            <div className="explore">
              <div
                onScroll={evt => this.scrollMore(evt)}
                onContextMenu={evt => this.folderMenu(evt)}
                className={this.state.isGrid ? 'file-list grid' : 'file-list list'}
              >
                <div className="recent">
                  <div className="flex-row">
                    {/* <RecentItem onOpen={this.onOpen} data={recent} />
                    <RecentItem onOpen={this.onOpen} data={recentFile} />
                    <RecentItem onOpen={this.onOpen} data={recentAudio} />
                    <RecentItem onOpen={this.onOpen} data={recent} /> */}
                    {this.state.recentFiles.map(item => {
                      return <RecentItem onOpen={() => this.onOpen(item)} data={item} />;
                    })}
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
                  <div onClick={() => this.sortByName()} className="name">
                    Name
                    {this.state.sortByName != 0 ? (
                      <span className="sort-icon">
                        <FontAwesomeIcon icon={this.state.sortByName > 0 ? faArrowDown : faArrowUp} />
                      </span>
                    ) : null}
                  </div>
                  <div className="type">Type</div>

                  <div onClick={() => this.sortByDate()} className="date">
                    Date
                    {this.state.sortByDate != 0 ? (
                      <span className="sort-icon">
                        <FontAwesomeIcon icon={this.state.sortByDate > 0 ? faArrowDown : faArrowUp} />
                      </span>
                    ) : null}
                  </div>

                  <div onClick={() => this.sortBySize()} className="size">
                    Size
                    {this.state.sortBySize != 0 ? (
                      <span className="sort-icon">
                        <FontAwesomeIcon icon={this.state.sortBySize > 0 ? faArrowDown : faArrowUp} />
                      </span>
                    ) : null}
                  </div>
                </div>

                {this.state.entryData.map(ele => {
                  return (
                    <FileBlock
                      selectedEntry={this.state.selectedEntry}
                      selectFile={this.selectEntry}
                      openContextMenu={this.openContextMenu}
                      isTouchSelector={this.state.isTouchSelector}
                      isTrash={this.isTrashFolder()}
                      data={ele}
                      onOpen={this.onOpen}
                    />
                  );
                })}
                {this.state.loading ? <img className="gif-loading" src="/img/loading.gif" /> : null}
                {!this.state.loading &&
                this.state.loadEnd &&
                this.state.entryData &&
                this.state.entryData.length == 0 ? (
                  <Nothing />
                ) : null}
              </div>
              {/* </div> */}

              <Activity
                openDetailTab={openDetailTab => (this.openDetailTab = openDetailTab)}
                notiOpen={this.state.notiOpen}
                closeNoti={this.closeNoti}
                selectedEntry={this.state.selectedEntry}
                folder={this.folderParse()}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Main;
