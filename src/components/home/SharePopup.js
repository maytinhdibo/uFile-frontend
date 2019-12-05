import React from 'react';
import Modal from 'components/common/Modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

class UserItem extends React.Component {
  render() {
    return (
      <span title={this.props.email} className="user-item">
        {this.props.name}
        <span className="icon">
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
    };
  }
  search = e => {
    this.setState({ searchValue: e.target.value });
  };
  copyLink=()=> {
    this.refs.linkshare.select();
    document.execCommand('copy');
  }
  render() {
    const users = [
      {
        id: 1234,
        name: 'Tran Cuong',
        email: 'iammaytinhdibo@gmail.com',
      },
      {
        id: 3234,
        name: 'Long Hoang',
        email: 'longhoang@gmail.com',
      },
    ];
    return (
      <Modal name="rename" onClose={this.props.onClose} visible={this.props.visible}>
        <div className="share-popup">
          <h3>Share</h3>

          <div className="share-option">
            <select>
              <option>Turn off shareable link</option>
              <option>Anyone can view</option>
              <option>Anyone can edit</option>
            </select>
            <button onClick={this.copyLink}>Copy link</button>
          </div>
          <input
            ref="linkshare"
            className="link-share"
            value="https://stackoverflow.com/questions/1895476/how-do-i-style-a-select-dropdown-with-only-css"
          />

          <h4>Or share to your partner</h4>

          <div className="list-user">
            {users.map(props => {
              return <UserItem {...props} />;
            })}
          </div>

          <input
            onChange={e => {
              this.search(e);
            }}
            value={this.state.searchValue}
            placeholder="Enter emails ..."
          />
          {this.state.searchValue.length > 0 ? (
            <div className="user-result">
              <span className="item">Cuong Tran - iammaytinhdibo@gmail.com</span>
              <span className="item">Cuong Tran - iammaytinhdibo@gmail.com</span>
              <span className="item">Cuong Tran - iammaytinhdibo@gmail.com</span>
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
