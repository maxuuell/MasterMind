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
      showModal: true,
      borderColor: 0
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
    this.startNewGame = this.startNewGame.bind(this);
    this.showAgreement = this.showAgreement.bind(this);
    this.agreementHelper = this.agreementHelper.bind(this);
  }

  beginRound() {
    var newHistory = this.state.calledSquares.slice();
    var square;
    if (newHistory[0]) {
      if (Math.random() < .3) {
        square = newHistory[0];
      }
    }
    if (!square) {
      square = Math.floor(Math.random() * 9);
    }
    console.log("---------> Round " + this.state.roundsLeft + " <--------- \n Square: " + square);
    this.lightItUp = setTimeout(this.lightSquare(square), 500);
    newHistory.push(square);
    this.setState({'calledSquares': newHistory})
    this.commence = setTimeout(()=>{this.endRound()}, 3000);
  }

  endRound() {
    var newHistory = this.state.calledSquares.slice();
    var scored = (newHistory[0] === newHistory[newHistory.length - 1]) === this.state.matchAsserted;
    console.log("oldSqure: " + newHistory[0]);
    console.log("asserted: " + this.state.matchAsserted);
    console.log("Scored: " + scored);
    if (scored) {
      this.showAgreement(1);
      this.setState({score: this.state.score + 1})
    } else {
      this.showAgreement(2);
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
    this.setState({n: event});
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
      calledSquares: newHistory
    })
    this.preGame = setTimeout(()=>{this.beginRound()}, 750);
  }

  showAgreement(code) {
    if(code === 1) {
      this.setState({borderColor: 1})
    }
    if (code === 2) {
      this.setState({borderColor: 2})
    }
    this.flash = setTimeout(()=>{this.agreementHelper()}, 250);
  }

  agreementHelper() {
    this.setState({borderColor: 0});
  }

  unlightSquare() {
    this.setState({litSquare: null});
  }

  lightSquare(square) {
    this.setState({litSquare: square});
    this.unLightItUp = setTimeout(()=>{this.unlightSquare()}, 2500);
  }

  componentWillUnmount() {
    if (this.commence) {
      clearTimeout(this.commence);
    }
    if (this.unLightItUp) {
      clearTimeout(this.unLightItUp);
    }
    if (this.preGame) {
      clearTimeout(this.preGame);
    }
    if (this.flash) {
      clearTimeout(this.flash);
    }
    if (this.lightItUp) {
      clearTimeout(this.lightItUp);
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
    this.setState({ showModal: false });
  }

  openModal() {
    this.setState({ showModal: true });
  }

  answerFlash(color) {
    if (color === 1) {
      return "youScore score"
    }
    if (color === 2) {
      return "youFail score"
    }
    else {
      return "score"
    }
  }

  render() {
    return (
      <div>
        <NBackModal
        setN={this.setN}
        beginGame={this.beginGame}
        startNewGame={this.startNewGame}
        closeModal={this.closeModal}
        openModal={this.openModal}
        showModal={this.state.showModal}
        />
        <div onClick={()=>this.assertMatch()} className="squareBox" style={{width: "300px", margin: "5px auto"}}>
          {_.range(9).map((i) => <NBackSquare key={i} squareId={i} litSquare={this.state.litSquare}/>)}
        </div>
        <div className={this.answerFlash(this.state.borderColor)}>Score: {this.state.score}</div>
      </div>
    );
  }
}
