import React from 'react';

class Signup extends React.Component {
    render() {
        return (
            <form className="form-group">
                <h1>Signup</h1>
                <p>To access awesome things</p>
                <br />
                <div className="input-group">
                    <input className="me-input" placeholder="@username" />
                    <input className="me-input" placeholder="@email" />
                    <input className="me-input" placeholder="@fullname" />
                    <input className="me-input" placeholder="@password" type="password" />
                    <input className="me-input" placeholder="@re-password" type="password" />
                </div>
                <button className="me-btn">Signup</button>
            </form>
        )
    }
}

export default Signup;