import React from 'react';
import { Link } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';

class Signup extends React.Component {
  render() {
    return (
      <form>
        <Link to="/" className="mini-btn">
          <FontAwesomeIcon icon={faChevronLeft} />
        </Link>
        <h1>Signup</h1>
        <p>To access awesome things</p>
        <br />
        <div className="input-group">
          <input className="me-input" placeholder="@username" required />
          <input
            className="me-input"
            type="email"
            placeholder="@email"
            required
          />
          <input className="me-input" placeholder="@fullname" required />
          <div className="row">
            <div style={{ paddingLeft: 0 }} className="container-fluid col-6">
              <input
                className="me-input"
                placeholder="@password"
                type="password"
              />
            </div>
            <div style={{ paddingRight: 0 }} className="container-fluid col-6">
              <input
                className="me-input"
                placeholder="@re-password"
                type="password"
              />
            </div>
          </div>
        </div>
        <button type="button" className="me-btn">Signup</button>
      </form>
    );
  }
}

export default Signup;
