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
      history: [null, null],
      score: 0,
      roundsLeft: 24,
      litSquare: 3,
      matchAsserted: false
    };
  }

  beginRound() {
    var newHistory = this.state.history.slice();
    var square = Math.floor(Math.random * 9);
    newHistory.push(square);
    this.setState({'history': newHistory})
    lightSquare(square);
    setTimeout(endRound, 3000);
  }

  endRound() {
    var newHistory = this.state.history.slice();
    var scored = (newHistory[0] === newHistory[newHistory.length - 1]) === this.state.matchAsserted;
    if (scored) {
      showAgreement();
      this.setState({score: this.state.score + 1})
    } else {
      showDisagreement();
    }
    this.setState({matchAsserted: false});
    this.setState({roundsLeft: this.state.roundsLeft - 1})
    newHistory.shift();
    this.setState({history: newHistory});
    if (this.state.roundsLeft === 0) {
      saveScore();
    }
    else {
      beginRound();
    }
  }

  setN(event, skips) {
    this.setState({n: skips})
  }

  assertMatch() {
    this.setState({matchAsserted: true});
  }

  litStatus() {

  }

  showAgreement() {
    //animate board to show user got answer correct
  }

  showDisagreement () {
    //animate board to show user got answer incorrect
  }

  lightSquare(square) {
    this.setState({litSquare: square});
    setTimeout(function(){this.setState({litSquare: null});}, 2500)
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

  render() {
    return (
      <div onKeyPress={this.assertMatch}>
        <NBackModal setN={this.setN.bind(this)}/>
        <div className="squareContainer" style={{width: "300px", margin: "5px auto"}}>
          {_.range(9).map((i) => <NBackSquare key={i} squareId={i} litSquare={this.state.litSquare}/>)}
        </div>
      </div>
    );
  }
}
