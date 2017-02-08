import React from 'react';

export default class GameMemory extends React.Component {
  render() {
    return (
      <div>
        <h2>Jimmie's Phaser Game!</h2>
        <div id="phaser-game"></div>
      </div>
    );
  }

  componentDidMount() {
    this.createGame();
  }

  createGame() {
    var game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-game', {preload: preload, create: create, update});

    function preload() {

    }

    function create() {

    }

    function update() {

    }
  }
  
}