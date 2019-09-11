import React from 'react';
import { Link } from "react-router-dom";

class Main extends React.Component {
    render() {
        return (
                <form className="form-group">
                    <h1>Login</h1>
                    <p>To access awesome things</p>
                    <br/>
                    <div className="input-group">
                        <input className="me-input" placeholder="@username" />
                        <input className="me-input" placeholder="@email" />
                        <input className="me-input" placeholder="@fullname" />
                        <input className="me-input" placeholder="@password" type="password" />
                        <input className="me-input" placeholder="@re-password" type="password" />
                    </div>
                    <button className="me-btn">Login</button>
                    <button className="me-btn invert">Login with Google ID</button>
                    <p className="signup-text">Don't have an account? 
                    <Link to="/signup">Signup</Link></p>
                </form>
        )
    }
}

export default Main;