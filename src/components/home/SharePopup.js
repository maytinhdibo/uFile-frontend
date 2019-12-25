import React from 'react';
import Modal from 'components/common/Modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

import fileServices from './../../services/files';
import userServices from './../../services/users';
import adminServices from './../../services/admin';

class UserItem extends React.Component {
  render() {
    return (
      <span title={this.props.email} className="user-item">
        {this.props.name}
        <span onClick={this.props.removeUser} className="icon">
          <FontAwesomeIcon icon={faTimes} />
        </span>
      </span>
    );
  }
}

export default class SharePopup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchValue: '',
      share_mode: 0,
      usersSearch: [],
      usersShare: [],
    };
  }

  copyLink = () => {
    this.refs.linkshare.select();
    document.execCommand('copy');
  };

  componentDidUpdate(prevProps) {
    if (this.props.selectedEntry && prevProps.visible != this.props.visible) {
      let entry_id = this.props.selectedEntry.id;
      fileServices.searchDetails({ file_id: entry_id }).then(data => {
        let fileData = data.result.files[0];
        this.setState({ share_mode: fileData.share_mode });
        console.log('online', fileData.share_mode);

        userServices.findByIds({ ids: data.result.files[0].users_shared }).then(userData => {
          let user_shared = userData.map((item, key) => {
            return {
              email: item.email,
              name: item.fullname,
              id: data.result.files[0].users_shared[key],
            };
          });
          this.setState({ usersShare: user_shared });
        });
      });
    }
  }

  searchUser = async (e) => {
   await this.setState({ searchValue: e.target.value });
    let listEmail = this.state.usersShare.map(item => {
      return item.email;
    });

    // console.log(listEmail);

    adminServices.searchUser(this.state.searchValue, 0, 3).then(data => {
      // console.log(data);
      this.setState({
        usersSearch: data.data.users.filter(item => listEmail.indexOf(item.email) == -1),
      });
      console.log(this.state.usersSearch);
    });
  };

  share = () => {
    console.log(this.state.share_mode);

    let data = {
      file_id: this.props.selectedEntry.id,
    };

    if (this.state.share_mode == 2) {
      data.share_by_link = true;
    }
    if (this.state.share_mode == 0 || (this.state.usersShare.length == 0 && this.state.share_mode == 1)) {
      data.private = true;
    }

    if (this.state.usersShare.length > 0 && this.state.share_mode == 1) {
      data.emails = this.state.usersShare.map(item => {
        return item.email;
      });
    }

    fileServices.share(data);
  };

  changeOption = e => {
    let value = e.target.value;
    this.setState({ share_mode: value }, () => {
      console.log(this.state.share_mode);
      this.share();
    });
  };

  addShareUser = item => {
    console.log(item);
    let list = this.state.usersShare;
    list.push({
      email: item.email,
      name: item.fullname,
    });
    this.setState({ usersShare: list });
    this.setState({ searchValue: '', usersSearch: [] });
    this.share();
  };

  removeUser = email => {
    let users = this.state.usersShare;
    users.splice(
      users.findIndex(function(i) {
        return i.email == email;
      }),
      1,
    );
    this.setState({ usersShare: users });
    if (users.length == 0) {
      this.setState({ share_mode: 0 });
    }
    this.share();
  };

  render() {
    return (
      <Modal name="rename" onClose={this.props.onClose} visible={this.props.visible}>
        <div className="share-popup">
          <h3>Share</h3>
          {/* {JSON.stringify(this.props.selectedEntry)} */}
          <div className="share-option">
            <select value={this.state.share_mode} onChange={e => this.changeOption(e)}>
              <option value={0}>Turn off shareable link</option>
              <option value={1}>Share to people in list</option>
              <option value={2}>Anyone can view</option>
              {/* <option value={2}>Anyone can edit</option> */}
            </select>
            <button onClick={this.copyLink}>Copy link</button>
          </div>
          <input
            ref="linkshare"
            className="link-share"
            value={
              this.props.selectedEntry &&
              (this.props.selectedEntry.isFolder
                ? window.location.origin + '/drive/' + this.props.selectedEntry.id
                : window.location.origin + '/viewer/' + this.props.selectedEntry.id)
            }
          />

          <h4>Or share to your partner</h4>

          <div className="list-user">
            {this.state.usersShare &&
              this.state.usersShare.map(props => {
                return <UserItem removeUser={() => this.removeUser(props.email)} {...props} />;
              })}
          </div>

          <input
            onChange={e => {
              this.searchUser(e);
            }}
            value={this.state.searchValue}
            placeholder="Enter emails ..."
          />
          {this.state.searchValue.length > 0 ? (
            <div className="user-result">
              {this.state.usersSearch.map(item => {
                return (
                  <span onClick={() => this.addShareUser(item)} className="item">
                    {item.fullname} - {item.email}
                  </span>
                );
              })}
            </div>
          ) : null}
          <div style={{ textAlign: 'right' }}>
            <button onClick={this.props.onClose} className="me-btn">
              Done
            </button>
          </div>
        </div>
      </Modal>
    );
  }
}
