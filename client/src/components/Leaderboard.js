import React from 'react';
import { TableItem } from './TableItem.js';
import { TableContainer } from './Table.js';
import { Links } from './Links.js';

export default class Leaderboard extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      gameToRender: undefined,
      gameInstances: [{name: "maxwell", score: 9001, date: "2/10/2017"}, {name: "maxwell", score: 8456, date: "2/08/2017"}, {name: "renata", score: 7866, date: "2/09/2017"}, {name: "andrew", score: 7865, date: "2/5/2017"}, {name: "andrew", score: 7801, date: "2/5/2017"}, {name: "andrew", score: 7790, date: "2/5/2017"}, {name: "andrew", score: 7789, date: "2/5/2017"}, {name: "andrew", score: 7230, date: "2/5/2017"}, {name: "jimmie", score: 6890, date: "2/09/2017"}, {name: "cory", score: 7, date: "2/04/2017"}]
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