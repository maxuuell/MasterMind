import React from 'react';
//import { Score } from './Score';
import $ from 'jquery';
import { NBackModal } from './nBackModal';
import { NBackSquare } from './nBackSquare';
import _ from 'lodash';

const NUM_WORDS = 5;

export default class NBackGame extends React.Component {
  constructor(props) {
    super(props);
    this.gametype = 'scramble';
    this.state = {
      n: 2,
      calledSquares: [null, null],
      score: 0,
      roundsLeft: 24,
      litSquare: 0,
      matchAsserted: false,
      showModal: true
    };
    this.beginRound = this.beginRound.bind(this);
    this.endRound = this.endRound.bind(this);
    this.setN = this.setN.bind(this);
    this.assertMatch = this.assertMatch.bind(this);
    this.beginGame = this.beginGame.bind(this);
    this.lightSquare = this.lightSquare.bind(this);
    this.unlightSquare = this.unlightSquare.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.openModal = this.openModal.bind(this);
    this.startNewGame =this.startNewGame.bind(this);
  }

  beginRound() {
    var newHistory = this.state.calledSquares.slice();
    var square = Math.floor(Math.random() * 9);
    this.lightSquare(square);
    console.log("Firing " + square)
    newHistory.push(square);
    this.setState({'calledSquares': newHistory})
    commence = setTimeout(()=>{this.endRound()}, 3000);
  }

  endRound() {
    var newHistory = this.state.calledSquares.slice();
    var scored = (newHistory[0] === newHistory[newHistory.length - 1]) === this.state.matchAsserted;
    if (scored) {
      //showAgreement();
      this.setState({score: this.state.score + 1})
    } else {
      //showDisagreement();
    }
    newHistory.shift();
    this.setState({matchAsserted: false,
      roundsLeft: this.state.roundsLeft - 1,
      calledSquares: newHistory});
    if (this.state.roundsLeft === 0) {
      this.saveScore();
    }
    else {
      this.beginRound();
    }
  }

  setN(event, skips) {
    this.setState({n: skips})
  }

  assertMatch() {
    this.setState({matchAsserted: true});
  }

  beginGame() {
    var newHistory = [];
    while (newHistory.length < this.state.n) {
      newHistory.push(null);
    }
    this.setState({
      score: 0,
      roundsLeft: 24,
      litSquare: null,
      matchAsserted: false,
      calledSquares: newHistory})
    preGame = setTimeout(()=>{this.beginRound()}, 750);
  }

  showAgreement() {
    //animate board to show user got answer correct
  }

  showDisagreement () {
    //animate board to show user got answer incorrect
  }

  unlightSquare() {
    this.setState({litSquare: null});
  }

  lightSquare(square) {
    this.setState({litSquare: square});
    unLightItUp = setTimeout(()=>{console.log(this); this.unlightSquare()}, 2500)
  }

  componentWillUnmount() {
    if (commence) {
      clearTimeout(commence);
    }
    if (unLightItUp) {
      clearTimeout(unLightItUp);
    }
    if (preGame) {
      clearTimeout(preGame);
    }
  }

  saveScore() {
    //post the score to the backend if user is logged in
    console.log(this.state.score);
    if (localStorage.username) {
      console.log('scramble game username', localStorage.username);
      var obj = {
        username: localStorage.username,
        gametype: this.gametype,
        score: this.state.score
      };
      $.ajax({
        type: 'POST',
        url: '/scores',
        data: JSON.stringify(obj),
        contentType: 'application/json',
        success: function(data) {
          console.log('data', data);
        }
      });
    } else {
      //nothing happens if username is not defined
      console.log('nothing happens', localStorage.username);
    }
  }

  startNewGame() {
    this.closeModal();
    this.beginGame();
  }

  closeModal() {
    console.log("Closing modal");
    this.setState({ showModal: false });
  }

  openModal() {
    console.log("Opening modal");
    this.setState({ showModal: true });
  }

  render() {
    return (
      <div onKeyPress={this.assertMatch}>
        <NBackModal
        setN={this.setN}
        beginGame={this.beginGame}
        startNewGame={this.startNewGame}
        closeModal={this.closeModal}
        openModal={this.openModal}
        showModal={this.state.showModal}
        />
        <div className="squareContainer" style={{width: "300px", margin: "5px auto"}}>
          {_.range(9).map((i) => <NBackSquare key={i} squareId={i} litSquare={this.state.litSquare}/>)}
        </div>
        <div className="score">Score: {this.state.score}</div>
      </div>
    );
  }
}
