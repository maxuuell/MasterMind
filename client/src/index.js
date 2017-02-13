import React from 'react';
import { render } from 'react-dom';
import { IndexRoute, Router, Route, browserHistory } from 'react-router';
import AuthService from './helpers/AuthService';
import GameScramble from './components/GameScramble';
import App from './components/App';
import Homepage from './components/Homepage';
import GameMemory from './components/Memory/GameMemory';
import Leaderboard from './components/Leaderboard';
import ProfileContainer from './components/Profile/ProfileContainer';
import NBackGame from './components/nBack/nBackGame';
import Simon from './components/Simon/Simon.js';
import GameProfileContainer from './components/GameProfile/GameProfileContainer';

const app = document.getElementById('app');
const auth = new AuthService('xkMUjA7Bggf2NQ4W0uZlU4wv1pqd6aDD', 'buzzme.auth0.com');

// validate authentication for private routes
const requireAuth = (nextState, replace) => {
  if (!auth.loggedIn()) {
    replace({ pathname: '/' })
  }
}

const profile = auth.getProfile();

render(
  <Router history={ browserHistory }>
    <Route path="/" component = { App } auth={ auth }>
      <IndexRoute component={ Homepage }></IndexRoute>
      <Route path="/memorygame" component={ GameMemory } />
      <Route path="/leaderboard" component={ Leaderboard } />
      <Route path="/profile" component={ ProfileContainer } onEnter={ requireAuth } />
      <Route path="/profile/nback" onEnter={ requireAuth } component={ GameProfileContainer } />
      <Route path="/profile/scramble" component={ GameProfileContainer } onEnter={ requireAuth } gameName='scramble' />
      <Route path="/profile/simon" component={GameProfileContainer} onEnter={ requireAuth } />
      <Route path="/profile/memory" component={ GameProfileContainer } onEnter={ requireAuth } />
      <Route path="/scramblegame" component={ GameScramble }/>
      <Route path="/nback" component={ NBackGame }/>
      <Route path="/simon" component={ Simon }/>
    </Route>
  </Router>
  , app
);
