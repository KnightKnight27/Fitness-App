import React, { Component } from 'react';
import { connect } from 'react-redux';
import Upload from './Upload';
import Login from './Login';


class Admin extends Component {

    //if logged in then show upload component else show login component

    render() {

        if (this.props.loggedIn === true) {
            return <Upload />;
        } else {
            return <Login />;
        }
    }
}
const mapStateToProps = (state) => {
    return {
        loggedIn: state.rootReducer.loggedIn,
    };
};

export default connect(mapStateToProps)(Admin);