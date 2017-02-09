import React from 'react';

export default class GameMemory extends React.Component {
  render() {
    return (
      <div>
        <div id="phaser-game"></div>
      </div>
    );
  }

  componentDidMount() {
    this.createGame();
  }

  createGame() {
    var game = new Phaser.Game(740, 480, Phaser.AUTO, 'phaser-game', {preload: preload, create: create});

    var blocks, colWidth = 6, colHeight = 6, displacementX = 110, displacementY = 70, startingPositionX = 80, startingPositionY = 50;
    var answers, text, previouslyClickedBlock;
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
      game.load.image('background', 'client/src/components/phasergame/graphics/breakout_bg.png');
      game.load.spritesheet('board_sprites', 'client/src/components/phasergame/graphics/breakout_sprites.png', 40, 40);
    }

    function create() {
      var background = game.add.sprite(0, 0,'background');
      background.scale.setTo(1.2);

      blocks = game.add.group();
      blocks.enableBody = true;
      blocks.inputEnableChildren = true;
      drawGrid(blocks, 'board_sprites', 1);
      toggleBoard();

      text = game.add.text(250, 16, 'Try to find the matching pairs', {fill: '#eeeeee'});
      blocks.onChildInputDown.add(onBlockClicked, this);
    }

    function onBlockClicked(block, pointer) {
      if (block.isClickable === true) {
        block.isClickable = false;
        block.loadTexture('board_sprites', block.blockID);
        if (previouslyClickedBlock) 
        {
          if (previouslyClickedBlock.blockID === block.blockID) {
            text.text = 'You found a matching pair!';

          } else {
            previouslyClickedBlock.loadTexture('board_sprites', 1);
            block.loadTexture('board_sprites', 1);
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

    function toggleBoard() {
      game.time.events.add(Phaser.Timer.SECOND * 2, function() {
        for (var i = 0; i < blocks.children.length; i++) {
          blocks.children[i].loadTexture('board_sprites', 1);
        }
      }, this);
    }
  }
  
}