import React from 'react';
import { NavBar } from './NavBar';
import { Login } from './Login';
import { SignUp } from './SignUp';


export default class App extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      todo: 'FILL_ME_IN',
      todos: 'FILL_ME_IN'
    };
  }
  render() {
    return (
      <div>
        <NavBar />
        <SignUp />
        <Login />
      </div>
    );
  }
}