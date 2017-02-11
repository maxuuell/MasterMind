import React from 'react';
import { Link } from 'react-router';

export default class Homepage extends React.Component {
  render() {
    return (
      <div className="container pt">

    <div className="row mt">
      <div className="col-lg-6 col-lg-offset-3 centered">
        <h3>Welcome to MasterMind!</h3>
        <h4>MasterMind is a collection of games designed to test and strengthen your mental fortitude. While everyone is allowed to play these games, creating an account gives
            you the ability to keep track of your personal progress</h4>
      </div>
    </div>
  </div>
    );
  }
}