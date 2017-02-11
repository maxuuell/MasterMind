import React from 'react';

export default class Simon extends React.Component {
  render() {
    return (
      <div>
        <div id="simon"></div>
      </div>
    );
  }

  componentDidMount() {
    this.createGame();
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