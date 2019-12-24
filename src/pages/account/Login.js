import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import userServices from '../../services/users';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
    };
  }
  componentWillMount() {
    userServices.fetchUserStatus().then(data => {
      if (data.is_admin === true) {
        this.props.history.push('/admin/dashboard');
      } else {
        this.props.history.push('/drive/home');
      }
    });
  }
  login = e => {
    const { username, password } = this.state;
    this.props.setLoading(true);
    setTimeout(() => {
      userServices
        .submitLoginRequest({ username, password })
        .then(data => {
          localStorage.avatar_url = data.avatar_url;
          localStorage.user_id = data.user_id;
          localStorage.fullname = data.fullname;
          localStorage.username = data.username;
          localStorage.email = data.email;
          localStorage.created_at = data.created_at;
          localStorage.updated_at = data.updated_at;
          if (data.is_admin === true) {
            this.props.history.push('/admin/dashboard');
          } else {
            this.props.history.push('/drive/home');
          }
        })
        .catch(() => {
          this.props.setLoading(false);
        });
    }, 1000);

    e.stopPropagation();
  };
  render() {
    const { state } = this;
    return (
      <form onSubmit={e => this.login(e)}>
        <h1>Login</h1>
        <p>To access awesome things</p>
        <br />
        <div className="input-group">
          <input
            value={state.username}
            onChange={e => {
              this.setState({ username: e.target.value });
            }}
            className="me-input"
            placeholder="@username"
          />
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

        <input type="submit" value="Login" onClick={e => this.login(e)} className="me-btn" />

        {/* <button type="button" className="me-btn invert">
          <a href="/drive/home">Login with Google ID</a>
        </button> */}
        <p className="signup-text">
          Don&apos;t have an account?&nbsp;
          <Link to="/signup">Signup</Link>
        </p>
      </form>
    );
  }
}

export default Login;
