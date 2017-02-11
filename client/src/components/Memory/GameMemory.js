import React from 'react';
import { MemoryModal } from './memoryModal';


export default class GameMemory extends React.Component {
  constructor(props) {
    super(props);
    this.gametype = 'memory';
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
        <MemoryModal
        beginGame={this.beginGame}
        startNewGame={this.startNewGame}
        closeModal={this.closeModal}
        openModal={this.openModal}
        showModal={this.state.showModal}
        />
        <div id="phaser-game"></div>
      </div>
    );
  }

  componentDidMount() {
    this.createGame();
  }

  saveScore() {
    //********************Call this at the end of the game!*******************
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
      $.ajax({
        type: 'POST',
        url: '/api/game',
        data: JSON.stringify(obj),
        contentType: 'application/json',
        success: function(data) {
          console.log('data', data);
        }
      });
    } else {
      //nothing happens if username is not defined
      console.log('nothing happens');
    }
  }

  beginGame() {
    //************Set state to opening conditions and start a new game****************
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
    var game = new Phaser.Game(740, 480, Phaser.AUTO, 'phaser-game', {preload: preload, create: create, update: update});

    var blocks, colWidth = 6, colHeight = 6, displacementX = 110, displacementY = 70, startingPositionX = 80, startingPositionY = 50;
    var answers, text, score = 0, previouslyClickedBlock, flipDelay = 0.3, initialDelay = 2;
    var blockTypes = [
      {amountUsed: 0, spriteIndex: 0},
      {amountUsed: 0, spriteIndex: 2},
      {amountUsed: 0, spriteIndex: 3},
      {amountUsed: 0, spriteIndex: 5},
      {amountUsed: 0, spriteIndex: 7},
      {amountUsed: 0, spriteIndex: 10},
      {amountUsed: 0, spriteIndex: 15},
      {amountUsed: 0, spriteIndex: 16},
      {amountUsed: 0, spriteIndex: 22},
      {amountUsed: 0, spriteIndex: 23},
      {amountUsed: 0, spriteIndex: 24},
      {amountUsed: 0, spriteIndex: 25},
      {amountUsed: 0, spriteIndex: 26},
      {amountUsed: 0, spriteIndex: 27},
      {amountUsed: 0, spriteIndex: 32},
      {amountUsed: 0, spriteIndex: 33},
      {amountUsed: 0, spriteIndex: 34},
      {amountUsed: 0, spriteIndex: 35},
    ];

    function preload() {
      game.load.image('background', 'client/src/components/Memory/graphics/breakout_bg.png');
      game.load.spritesheet('board_sprites', 'client/src/components/Memory/graphics/breakout_sprites.png', 40, 40);
    }

    function create() {
      var background = game.add.sprite(0, 0,'background');
      background.scale.setTo(1.2);

      blocks = game.add.group();
      blocks.enableBody = true;
      blocks.inputEnableChildren = true;
      drawGrid(blocks, 'board_sprites', 1);
      toggleBlocks(blocks.children, initialDelay);

      text = game.add.text(250, 16, 'Score ' + score, {fill: '#eeeeee'});
      blocks.onChildInputDown.add(onBlockClicked, this);
    }

    function update() {

    }

    function onBlockClicked(block, pointer) {
      if (block.isClickable === true) {
        block.isClickable = false;
        block.loadTexture('board_sprites', block.blockID);
        if (previouslyClickedBlock)
        {
          if (previouslyClickedBlock.blockID === block.blockID) {
            score++;
            text.text = 'Score: ' + score;

          } else {
            toggleBlocks([previouslyClickedBlock, block], flipDelay);
          }
          block.isClickable = true;
          previouslyClickedBlock.isClickable = true;
          previouslyClickedBlock = null;

        } else {
          previouslyClickedBlock = block;
        }
      }
    }

    function findAvailableSprite() {
      var randomizedID = Math.floor(game.rnd.realInRange(0, blockTypes.length));
      if (randomizedID > 35) {
        randomizedID = 35;
      }
      var selectedBlock = blockTypes[randomizedID];

      if (selectedBlock.amountUsed < 2) {
        selectedBlock.amountUsed++;
        return selectedBlock.spriteIndex;
      }
      else {
        for (var i = 0; i < blockTypes.length; i++) {
          if (blockTypes[i].amountUsed < 2) {
            blockTypes[i].amountUsed++;
            return blockTypes[i].spriteIndex;
          }
        }
      }
    }

    function drawGrid(group, spriteSheet, indexInSheet) {
      for (var i = 0; i < colWidth; i++) {
        for (var j = 0; j < colHeight; j++) {
          var spriteID = findAvailableSprite();
          var curBlock = group.create(startingPositionX + (displacementX * j), startingPositionY + (displacementY * i), spriteSheet, spriteID);
          curBlock.scale.setTo(1.3);
          curBlock.blockID = spriteID;
          curBlock.isClickable = true;
        }
      }
    }

    function toggleBlocks(blocksToToggle, timeToWait) {
      timeToWait = timeToWait || 2;

      game.time.events.add(Phaser.Timer.SECOND * timeToWait, function() {
        for (var i = 0; i < blocksToToggle.length; i++) {
          blocksToToggle[i].loadTexture('board_sprites', 1);
        }
      }, this);
    }
  }

}