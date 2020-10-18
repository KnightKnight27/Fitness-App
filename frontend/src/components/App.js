import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Navbar from './Navbar';
import Home from './Home';
import Contact from './Contact';
import About from './About';
import Admin from './Admin';
import Training from './Training';
import { connect } from 'react-redux';
import * as actions from '../actions/index';

class App extends Component {
  componentDidMount() {
    this.props.fetchAllTrainings();
  }


  render() {
    return (
      <BrowserRouter>
        <div >
          <Navbar />
          <Route exact path="/" component={Home} />
          <Route exact path="/about" component={About} />
          <Route exact path="/contact" component={Contact} />
          <Route exact path="/admin" component={Admin} />
          <Route exact path="/training/:training_id" component={Training} />
        </div>
      </BrowserRouter>
    );
  }
}

export default connect(null, actions)(App);
