import React from 'react';
import '../../styles/account.scss'

export default class Account extends React.Component {
  render() {
    return (
      <div id="account-page">
        <div className="main">
          <h2>Account setting</h2>
          <table>
            <tr>
            <td>Fullname</td>
            <td>Cuong Tran</td>
            </tr>
            <tr>
            <td>Email</td>
            <td>iammaytinhdibo@gmail.com</td>
            </tr>
            <tr>
            <td>Storage</td>
            <td>13.2GB/15GB (78%)</td>
            </tr>
          </table>
          <button className="change-pass me-btn">Change password</button>
        </div>
        </div>
    );
  }
}