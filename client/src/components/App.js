import React, { Component } from 'react';
import { NavBar } from './NavBar';
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
        auth: this.props.route.auth //sends auth instance from route to children
      })
    }

    return (
      <div>
        <NavBar />
        {children}
      </div>
    );
  }
}
