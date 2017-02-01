import React from 'react';
import {NavBar} from './NavBar';

export default class App extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      todo: 'FILL_ME_IN',
      todos: 'FILL_ME_IN'
    };
  }
  render() {
    console.log('Goodbye world')
    return (
      <div>
        <NavBar />
      </div>
    );
  }
}