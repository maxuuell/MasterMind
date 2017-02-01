import React from 'react';
import { render } from 'react-dom';
import { IndexRoute, Router, Route, Link, hashHistory } from 'react-router';

import App from './components/App';
import {SignUp} from './components/SignUp';
import Homepage from './components/Homepage';
import Memory from './components/Memory';
import {LogIn} from './components/Login';

const app = document.getElementById('app');

console.log('Memory is index js ', typeof Memory);
console.log('Signup is index js ', typeof SignUp);
render(
  <Router history={hashHistory}>
    <Route path="/" component = {App}>
      <IndexRoute component={Homepage}></IndexRoute>
      <Route path="memory" component={Memory}/>
      <Route path="login" component={LogIn}/>
      <Route path="signup" component={SignUp}/>
    </Route>
  </Router>
  , app
);
