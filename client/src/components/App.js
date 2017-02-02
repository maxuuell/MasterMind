import React, { Component } from 'react';
import { NavBar } from './NavBar';
import { Login } from './Login';
import { SignUp } from './SignUp';
import Homepage from './Homepage';
import Memory from './Memory';

export default class App extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      todo: 'FILL_ME_IN',
      todos: 'FILL_ME_IN'
    };
  }
  render() {
    console.log('memory is ', typeof Memory);
    console.log('navbar is ', typeof NavBar);
    console.log('this props children', this.props.children);
    return (
      <div>
        <NavBar />
        {this.props.children}
      </div>
    );
  }
}