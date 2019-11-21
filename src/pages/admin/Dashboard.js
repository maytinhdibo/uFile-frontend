import React from 'react';
import { Link } from 'react-router-dom';

import '../../styles/admin.scss';

import Modal from '../../components/common/Modal';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faLock, faInfoCircle, faTimes } from '@fortawesome/free-solid-svg-icons';

export default class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      infoModal: true,
    };
  }
  render() {
    return (
      <div id="adm-page">
        <header className="adm-header">
          Administrator dashboard
          <span className="profile">
            <a>
              Trần Cường
              <span className="icon">
                <FontAwesomeIcon icon={faChevronDown} />
              </span>
            </a>
          </span>
        </header>
        <div className="adm-search-form  me-input">
          <input />
          <button>Tìm kiếm</button>
        </div>

        <Modal onClose={() => this.setState({ infoModal: false })} visible={this.state.infoModal}>
          <div className="me-modal-header">
            <h3>Thông tin người dùng</h3>
            <FontAwesomeIcon onClick={() => this.setState({ infoModal: false })} style={{ cursor: 'pointer' }} icon={faTimes} />
          </div>
          <div>
            <table className="admin-user-info">
              <tr>
                <th>Tên:</th>
                <td>Trần Cường</td>
              </tr>
              <tr>
                <th>Usename:</th>
                <td>maytinhdibo</td>
              </tr>
              <tr>
                <th>Email:</th>
                <td>iammaytinhdibo@gmail.com</td>
              </tr>
              <tr>
                <th>Join at:</th>
                <td>24/10/2019</td>
              </tr>
              <tr>
                <th>Update at:</th>
                <td>26/10/2019</td>
              </tr>
            </table>
            Người dùng đang bị tạm khóa vô thời hạn
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
          {[1, 21, 42, 2, 1].map(object => {
            return (
              <tr>
                <td>Tran Cuong</td>
                <td>maytinhdibo</td>
                <td>iammaytinhdibo@gmail.com</td>
                <td className="center">19-10-2019</td>
                <td className="center">24-10-2019</td>
                <td>
                  <span className="icon">
                    <FontAwesomeIcon icon={faLock} />
                  </span>
                  <span className="icon">
                    <FontAwesomeIcon icon={faInfoCircle} />
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