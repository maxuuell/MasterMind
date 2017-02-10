import React from 'react';
import { render } from 'react-dom';
import { IndexRoute, Router, Route, browserHistory } from 'react-router';
import AuthService from './helpers/AuthService';
import GameScramble from './components/GameScramble';
import App from './components/App';
import SignUp from './components/SignUp';
import Homepage from './components/Homepage';
import GameMemory from './components/Memory/GameMemory';
<<<<<<< HEAD
import { Leaderboard } from './components/Leaderboard';
import ProfileContainer from './components/Profile/ProfileContainer';
=======
import Leaderboard from './components/Leaderboard';
import { Profile } from './components/Profile';
>>>>>>> Add leaderboard components that show links to games and a table.
import NBackGame from './components/nBack/nBackGame';
import Simon from './components/Simon/Simon.js';

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
<<<<<<< HEAD
  <Router history={ browserHistory }>
    <Route path="/" component = { App } auth={ auth }>
      <IndexRoute component={ Homepage }></IndexRoute>
      <Route path="memorygame" component={ GameMemory }/>
      <Route path="leaderboard" component={ Leaderboard }/>
      <Route path="profile" component={ ProfileContainer } onEnter={ requireAuth } />
      <Route path="profile/nback" />
      <Route path="profile/scramble" />
      <Route path="profile/simon" />
      <Route path="profile/memory" />
      <Route path="scramblegame" component={ GameScramble }/>
      <Route path="signup" component={ SignUp }/>
      <Route path="nback" component={ NBackGame }/>
      <Route path="simon" component={ Simon }/>
    </Route>
  </Router>
=======
    <Router history={ browserHistory }>
      <Route path="/" component = { App } auth={ auth }>
        <IndexRoute component={ Homepage }></IndexRoute>
        <Route path="memorygame" component={ GameMemory }/>
        <Route path="leaderboard" component={ Leaderboard }/>
        <Route path="profile" component={ Profile } onEnter={ requireAuth }/>
        <Route path="scramblegame" component={ GameScramble }/>
        <Route path="signup" component={ SignUp }/>
        <Route path="nback" component={ NBackGame }/>
        <Route path="simon" component={ Simon }/>

      </Route>
    </Router>
>>>>>>> Add leaderboard components that show links to games and a table.
  , app
);
