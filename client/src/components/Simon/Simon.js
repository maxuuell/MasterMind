import React from 'react';
import { SimonModal } from './simonModal.js'

export default class Simon extends React.Component {
  constructor(props) {
    super(props);
    this.gametype = 'simon';
    this.profile = props.auth.getProfile();
    this.state = {
      score: 0,
      showModal: true
    };
    this.saveScore = this.saveScore.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
    this.beginGame = this.beginGame.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.openModal = this.openModal.bind(this);
    this.startNewGame = this.startNewGame.bind(this);
  }

  render() {
    return (
      <div>
        <SimonModal
        beginGame={this.beginGame}
        startNewGame={this.startNewGame}
        closeModal={this.closeModal}
        openModal={this.openModal}
        showModal={this.state.showModal}
        />
        <div id="simon"></div>
      </div>
    );
  }

  componentDidMount() {
    this.createGame();
  }

  saveScore() {
    // ********************Call this at the end of the game!*******************
    alert("The game is over. Open the settings to start a new game!");
    console.log(this.state.score);
    if (this.profile) {
      var obj = {
        email: this.profile.email,
        name: this.profile.name,
        gameName: this.gametype,
        score: this.state.score,
        n: null
      };
      fetch(`/api/game`, {
        method: 'POST',
        headers: new Headers({'Content-Type': 'application/json'}),
        body: JSON.stringify(obj)
      })
      .then((response) => {
        console.log("Game Posted");
      }).catch((err) => {
        console.log(err);
      });
    }
  }

  beginGame() {
    // ************Set state to opening conditions and start a new game****************
  }

  //close the modal and start a new game
  startNewGame() {
    this.closeModal();
    this.beginGame();
  }

  closeModal() {
    this.setState({ showModal: false });
  }

  openModal() {
    this.setState({ showModal: true });
  }

  createGame() {
    var game = new Phaser.Game(740, 480, Phaser.AUTO, 'simon', { preload: preload, create: create, update: update, render:render });

    var simon, width = 3, height = 2, minCount = 1, maxCount = 10;
    var sequenceList = [];

    function preload() {
      game.load.image('background', 'client/src/components/Simon/imgs/blue.jpg');
      game.load.spritesheet('item', 'client/src/components/Simon/imgs/number-buttons.png', 160, 160);
    }

    function create() {
      game.add.sprite(0,0, "background");
      simon = game.add.group();
      simon.inputEnableChildren = true;

      for(var i =0; i < height; i++){
        for(var j =0; j < width; j++){
          if(i > 0){
            var item = simon.create(120 + (200*j), 100 + (160*i), 'item', 3+j );
            item.tileId = 3+j;
          } else {
            var item = simon.create(120 + (200*j), 100 + (160*i), 'item', 0+j );
            item.tileId = 0+j;
          }
            item.scale.setTo(0.7);
        }
      }

      //Set onChildInputDown event listener
      simon.onChildInputDown.add(onTileClicked, this);
  }

    function createSequence() {
      sequenceList = [];
      // generate a random number between 1 and maxCount
      var num = Math.floor(game.rnd.realInRange(minCount, maxCount));

      // for loop
      for(var i = 0; i <= num; i++) {
        var newNum = Math.floor(game.rnd.realInRange(0, 5));
        sequenceList.push(newNum);
      }
    }

    function update() {

    }

    function render() {
    }

    function onTileClicked(tile, pointer){
      console.log(tile.tileId, "Tile");
      console.log(pointer, "Pointer");
    }
}
}