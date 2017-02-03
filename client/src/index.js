import React from 'react';
import { render } from 'react-dom';
import { IndexRoute, Router, Route, Link, hashHistory } from 'react-router';

import App from './components/App';
import SignUp from './components/SignUp';
import Homepage from './components/Homepage';
import GameMemory from './components/GameMemory';
import LogIn from './components/Login';
import {Leaderboard} from './components/Leaderboard';
import {Profile} from './components/Profile';
import GameScramble from './components/GameScramble';

const app = document.getElementById('app');

console.log('GameMemory is index js asdfasdf ', typeof GameMemory);
console.log('GameScramble is index js ', typeof GameScramble);
console.log('hello');
render(
  <Router history={hashHistory}>
    <Route path="/" component = {App}>
      <IndexRoute component={Homepage}></IndexRoute>
      <Route path="memorygame" component={GameMemory}/>
      <Route path="leaderboard" component={Leaderboard}/>
      <Route path="profile" component={Profile}/>
      <Route path="scramblegame" component={GameScramble}/>
      <Route path="login" component={LogIn}/>
      <Route path="signup" component={SignUp}/>
    </Route>
  </Router>
  , app
);
