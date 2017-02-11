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

  nback() {
    console.log("nback log");
    this.setState({
      gameToRender: "nback"
    })

  }

  simon() {
    console.log("simon log");
  }

  scramble() {
    console.log("scramble log");
  }

  memory() {
    console.log("memory log");
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