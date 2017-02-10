import React from 'react';
import { Board } from './Board';
import { UserEvents } from './UserEvents';
import { Music } from './Music';

export default class Simon extends React.Component {
  render() {
    return (
        <div id="simon">
        <Board />
        <UserEvents />
        <Music />
        </div>
    );
  }
}