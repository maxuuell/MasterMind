import React from 'react';
import { TableItem } from './TableItem.js';
import { TableContainer } from './Table.js';
import { Links } from './Links.js';

export default class Leaderboard extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      gameToRender: undefined,
      gameInstances: []
    }

    this.nback = this.nback.bind(this);
    this.simon = this.simon.bind(this);
    this.scramble = this.scramble.bind(this);
    this.memory = this.memory.bind(this);

  }

  leaderboardFetch(gameName) {
    fetch(`/api/${gameName}/scores`, {
      method: 'GET',
      headers: new Headers({'Content-Type': 'application/json'})
    }).then((response) => {
      response.json().then((scoresArray) => {
        this.setState({
          gameInstances: scoresArray  
        })
      })
    }).catch((err) => {
      console.log(err);
    })
  }

  nback() {
    this.setState({
      gameToRender: "NBack"
    })
    this.leaderboardFetch('nback');
  }

  simon() {
    this.setState({
      gameToRender: "Simon"
    })
    this.leaderboardFetch('simon');
  }

  scramble() {
    this.setState({
      gameToRender: "Scramble"
    })
    this.leaderboardFetch('scramble');
  }

  memory() {
    this.setState({
      gameToRender: "Memory"
    })
    this.leaderboardFetch('memory');
  }

  render() {

    return (
      <div>
        <h1>Leaderboards</h1>
        <Links
          nback={this.nback}
          simon={this.simon}
          scramble={this.scramble}
          memory={this.memory} 
        />
        <TableContainer
          gameTitle={this.state.gameToRender}
          games={this.state.gameInstances}
        />
      </div>
    );
  }
}