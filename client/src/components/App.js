import React, { Component } from 'react';
import { NavBar } from './NavBar';
import { Login } from './Login';
import { SignUp } from './SignUp';
import Homepage from './Homepage';

export default class App extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      todo: 'FILL_ME_IN',
      todos: 'FILL_ME_IN'
    };
  }
  render() {
    console.log('hello')
    return (
      <div>
        <NavBar />
        {this.props.children}
      </div>
    );
  }
}