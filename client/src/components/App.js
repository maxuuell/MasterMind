import React, { Component } from 'react';
import { Navigation } from './NavBar';
import { Login } from './Login';
import { SignUp } from './SignUp';
import Homepage from './Homepage';

export default class App extends React.Component {
  constructor (props) {
    super(props);
  }

  render() {
    let children = null;
    if (this.props.children) {
      children = React.cloneElement(this.props.children, {
        auth: this.props.route.auth,
        profile: this.props.route.profile
      })
    }

    return (
      <div>
        <Navigation auth={this.props.route.auth} profile={this.props.route.profile} />
        {children}
      </div>
    );
  }
}
