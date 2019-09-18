import React from 'react';
import { Link } from "react-router-dom";

class Login extends React.Component {
    constructor(props){
        super(props);
    }
    render() {
        return (
            <form>
                <h1>Login</h1>
                <p>To access awesome things</p>
                <br />
                <div className="input-group">
                    <input className="me-input" placeholder="@username" />
                    <input className="me-input" placeholder="@password" type="password" />
                </div>
                <button onClick={()=>this.props.setLoading(true)} className="me-btn">Login</button>
                <button className="me-btn invert">Login with Google ID</button>
                <p className="signup-text">Don't have an account? <Link to="/signup">Signup</Link></p>
            </form>
        )
    }
}

export default Login;