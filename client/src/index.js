import React from 'react';
import { render } from 'react-dom';
import { IndexRoute, Router, Route, hashHistory } from 'react-router';
import AuthService from './helpers/AuthService';
import GameScramble from './components/GameScramble';
import App from './components/App';
import SignUp from './components/SignUp';
import Homepage from './components/Homepage';
import GameMemory from './components/phasergame/GameMemory';
import { Leaderboard } from './components/Leaderboard';
import { Profile } from './components/Profile';
import NBackGame from './components/nBack/nBackGame';

const app = document.getElementById('app');
const auth = new AuthService('xkMUjA7Bggf2NQ4W0uZlU4wv1pqd6aDD', 'buzzme.auth0.com');

// validate authentication for private routes
const requireAuth = (nextState, replace) => {
  if (!auth.loggedIn()) {
    console.log('Nope!')
    replace({ pathname: '/' })
  }
}

const profile = auth.getProfile();

render(
    <Router history={hashHistory}>
      <Route path="/" component = { App } auth={ auth } profile={ profile }>
        <IndexRoute component={ Homepage }></IndexRoute>
        <Route path="memorygame" component={ GameMemory }/>
        <Route path="leaderboard" component={ Leaderboard }/>
        <Route path="profile" component={ Profile } onEnter={ requireAuth }/>
        <Route path="scramblegame" component={ GameScramble }/>
        <Route path="signup" component={ SignUp }/>
        <Route path="nback" component={ NBackGame }/>
      </Route>
    </Router>
  , app
);
