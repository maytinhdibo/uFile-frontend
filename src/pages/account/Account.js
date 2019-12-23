import React from 'react';
import '../../styles/account.scss';
import userServices from './../../services/users';
import { alertText } from 'components/common/Alert';

export default class Account extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      changePass: false,
      cPassword: '',
      newPassword: '',
      rnewPassword: '',
    };
  }
  changePass = () => {
    if (this.state.newPassword != this.state.rnewPassword) alertText('Please type two same password!');
    userServices
      .changePass({
        email: localStorage.email,
        current_password: this.state.cPassword,
        new_password: this.state.newPassword,
      })
      .then(() => {
        this.props.history.push('/');
      });
  };
  render() {
    return (
      <div id="account-page">
        <div style={{ display: !this.state.changePass ? 'auto' : 'none' }} className="main">
          <h2>Account setting</h2>
          <table>
            <tr>
              <td>Fullname</td>
              <td>{localStorage.fullname}</td>
            </tr>
            <tr>
              <td>Email</td>
              <td>{localStorage.email}</td>
            </tr>
            <tr>
              <td>Storage package</td>
              <td>15GB</td>
            </tr>
          </table>
          <button onClick={() => this.setState({ changePass: true })} className="change-pass me-btn">
            Change password
          </button>
        </div>

       { this.state.changePass ? <div className="main">
          <h2>Change password</h2>
          <label>Current password</label>
          <input
            value={this.state.cPassword}
            onChange={e => {
              this.setState({ cPassword: e.target.value });
            }}
            type="password"
          />
          <label>New password</label>
          <input
            value={this.state.newPassword}
            onChange={e => {
              this.setState({ newPassword: e.target.value });
            }}
            type="password"
          />
          <label>Type again</label>
          <input
            value={this.state.rnewPassword}
            onChange={e => {
              this.setState({ rnewPassword: e.target.value });
            }}
            type="password"
          />
          <button onClick={this.changePass} className="change-pass me-btn">
            Change password
          </button>
        </div>:null}
      </div>
    );
  }
}
