import React from 'react';
import '../../styles/admin.scss';

import Modal from '../../components/common/Modal';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faLock, faInfoCircle, faTimes, faUnlock } from '@fortawesome/free-solid-svg-icons';
import userServices from '../../services/users';
import adminServices from '../../services/admin';

export default class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      infoModal: false,
      users: [],
      selectedUser: {},
      q: '',
      page: 1,
      ipp: 10,
    };
  }

  switchBlockStatus = (is_active, email) => {
    if (!this.state.selectedUser.is_active) {
      adminServices.unBlockUser(email).then(data => {
        console.log(data);
      });
    } else {
      adminServices.blockUser(email).then(data => {
        console.log(data);
      });
    }
    let sw = this.state.selectedUser;
    sw.is_active = !sw.is_active;
    this.setState({ selectedUser: sw });
  };

  componentDidMount() {
    this.searchUser('', 1, 10);
  }

  searchUser = () => {
    adminServices.searchUser(this.state.q, this.state.page, this.state.ipp).then(data => {
      this.setState({ users: data.data.users });
    });
  };
  logout = () => {
    userServices.submitLogoutRequest().then(data => {
      localStorage.clear();
      this.props.history.push('/');
    });
  };
  handleChange = e => {
    this.setState({ q: e.target.value });
  };

  render() {
    return (
      <div id="adm-page">
        <header className="adm-header">
          Administrator dashboard
          <span className="profile">
            <a>
              {localStorage.fullname}
              <span className="icon">
                <FontAwesomeIcon icon={faChevronDown} />
              </span>
            </a>

            <ul>
              {/* <li>Account setting</li> */}
              <li onClick={this.logout}>Logout</li>
            </ul>
          </span>
        </header>
        <div className="adm-search-form  me-input">
          <input placeholder="Enter username or email...." value={this.state.q} onChange={this.handleChange} />
          <button onClick={this.searchUser}>Search</button>
        </div>

        <Modal onClose={() => this.setState({ infoModal: false })} visible={this.state.infoModal}>
          <div className="me-modal-header">
            <h3>User detail</h3>
            <FontAwesomeIcon
              onClick={() => this.setState({ infoModal: false })}
              style={{ cursor: 'pointer' }}
              icon={faTimes}
            />
          </div>
          <div>
            <table className="admin-user-info">
              <tr>
                <th>Name:</th>
                <td>{this.state.selectedUser.fullname}</td>
              </tr>
              <tr>
                <th>Usename:</th>
                <td>{this.state.selectedUser.username}</td>
              </tr>
              <tr>
                <th>Email:</th>
                <td>{this.state.selectedUser.email}</td>
              </tr>
              {/* <tr>
                <th>Join at:</th>
                <td>{this.state.selectedUser.created_at}</td>
              </tr>
              <tr>
                <th>Update at:</th>
                <td>{this.state.selectedUser.updated_at}</td>
              </tr> */}

              <tr>
                <th>Storage package:</th>
                <td>15GB</td>
              </tr>
            </table>
            <button
            style={{
                padding:"9px",
                background:"#ccc",
                color:"#eee",
                fontWeight:"700",
                borderRadius:"5px",
                backgroundColor: this.state.selectedUser.is_active?"#f55":"#22a3ff"
            }}
              onClick={() => {
                this.switchBlockStatus(this.state.selectedUser, this.state.selectedUser.email);
              }}
            >
              {this.state.selectedUser.is_active ? 'Block' : 'Unblock'} user
            </button>
          </div>
        </Modal>

        <table border="0" className="adm-user-table">
          <tr>
            <th width="220">Fullname</th>
            <th width="150">Username</th>
            <th width="150">Email</th>
            <th width="150">Join at</th>
            <th width="150">Update at</th>
            <th>Action</th>
          </tr>
          {this.state.users.map(user => {
            return (
              <tr>
                <td>{user.fullname}</td>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td className="center">{user.created_at}</td>
                <td className="center">{user.updated_at}</td>
                <td>
                  <span className="icon">
                    <FontAwesomeIcon icon={user.is_active ? faUnlock : faLock} />
                  </span>
                  <span className="icon">
                    <FontAwesomeIcon
                      onClick={() => this.setState({ infoModal: true, selectedUser: user })}
                      icon={faInfoCircle}
                    />
                  </span>
                </td>
              </tr>
            );
          })}
        </table>
      </div>
    );
  }
}
