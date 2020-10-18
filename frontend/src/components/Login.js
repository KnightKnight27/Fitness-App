import React, { Component } from 'react';
import { connect } from 'react-redux';
class Login extends Component {
    state = {
        username: "",
        password: ""
    }
    handleChange = e => {
        this.setState({ [e.target.id]: e.target.value });
    }

    handleSubmit = e => {
        e.preventDefault();
        this.props.login(this.state);
    }
    render() {
        return (
            <div className="container">
                <form onSubmit={this.handleSubmit}>
                    <label htmlFor="username">UserName</label>
                    <input type="text" id="username" onChange={this.handleChange}></input>
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" onChange={this.handleChange}></input>
                    <button type="submit" className="btn waves-effect waves-light">Login</button>
                </form>
            </div>
        );
    }
}

const mapDispatchToState = (dispatch) => {
    return {
        login: (loginCred) => { dispatch({ type: 'LOGIN', loginCred }); }
    }
}

export default connect(null, mapDispatchToState)(Login);