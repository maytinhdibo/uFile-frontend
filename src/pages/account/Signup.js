import React from 'react';
import { Link, withRouter } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';

import userServices from '../../services/users';
import { alertText } from 'components/common/Alert';

import { usernameValidator, fullnameValidator, emailValidator, passwordValidator } from './../../helpers/validator';

class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      username: '',
      fullname: '',
      rePassword: '',
      password: '',
    };
  }
  signup = () => {
    this.props.setLoading(true);
    const { email, username, fullname, password, rePassword } = this.state;
    if (password !== rePassword) {
      alertText('Please type same two password!');
      this.props.setLoading(false);
      return;
    }
    if (!usernameValidator(username)) {
      alertText('Please enter username minimum 8 character');
      this.props.setLoading(false);
      return;
    }
    if (!emailValidator(email)) {
      alertText('Please enter a correct email');
      this.props.setLoading(false);
      return;
    }
    if (!fullnameValidator(fullname)) {
      alertText('Please enter a correct name');
      this.props.setLoading(false);
      return;
    }
    if (!passwordValidator(password)) {
      alertText('Please enter a password minimum 8 character and invalid character');
      this.props.setLoading(false);
      return;
    }
    userServices
      .submitRegister({
        email,
        username,
        fullname,
        password,
      })
      .then(data => {
        alertText('Please check email to confirm your account!');
        this.props.setLoading(false);
        this.props.history.push('/');
      })
      .catch(() => {
        this.props.setLoading(false);
      });
  };
  render() {
    console.log(this.props);
    const { state } = this;
    return (
      <form>
        <Link to="/" className="mini-btn">
          <FontAwesomeIcon icon={faChevronLeft} />
        </Link>
        <h1>Signup</h1>
        <p>To access awesome things</p>
        <br />
        <div className="input-group">
          <input
            className="me-input"
            value={state.username}
            onChange={e => {
              this.setState({ username: e.target.value });
            }}
            placeholder="@username"
            required
          />
          <input
            className="me-input"
            value={state.email}
            onChange={e => {
              this.setState({ email: e.target.value });
            }}
            type="email"
            placeholder="@email"
            required
          />
          <input
            className="me-input"
            value={state.fullname}
            onChange={e => {
              this.setState({ fullname: e.target.value });
            }}
            placeholder="@fullname"
            required
          />
          <div className="row">
            <div style={{ paddingLeft: 0 }} className="container-fluid col-6">
              <input
                value={state.password}
                onChange={e => {
                  this.setState({ password: e.target.value });
                }}
                className="me-input"
                placeholder="@password"
                type="password"
              />
            </div>
            <div style={{ paddingRight: 0 }} className="container-fluid col-6">
              <input
                value={state.rePassword}
                onChange={e => {
                  this.setState({ rePassword: e.target.value });
                }}
                className="me-input"
                placeholder="@re-password"
                type="password"
              />
            </div>
          </div>
        </div>
        <button onClick={this.signup} type="button" className="me-btn">
          Signup
        </button>
      </form>
    );
  }
}

export default withRouter(Signup);
