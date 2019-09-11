import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Login from './Login';
import Signup from './Signup';

class AccountRouter extends React.Component {
    render() {
        return (
            <div className="login-page">
                 <div className="logo">
                     <h2>uFile - Your cloud</h2>
                    <p>Best choice for online system!</p>
                     </div>
              
              <Router>
              <Route path="/" exact component={Login} />
              <Route path="/signup" exact component={Signup} />
              </Router>

                <div className="overlay"></div>

                <img src="img/home-vector.png" className="home-vector"/>

                <footer className="footer">By uFile team, UET with love</footer>
            </div>
        )
    }
}

export default AccountRouter;