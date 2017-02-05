import React from 'react';
import { data }  from './Data.js';
import { Timer } from './Timer.js';
import { Score } from './Score.js';
import $ from 'jquery';

export default class GameScramble extends React.Component {
  constructor(props) {
    super(props);
    this.gametype = 'scramble';
    this.state = {
      userInput: '',
      position: 1,
      word: data[0],
      shuffled: null,
      score: 0,
      timeLeft: 60
    };
  }
  shuffle(string) {
    var characters = string.split('');
    var length = characters.length;
    for (var i = length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = characters[i];
      characters[i] = characters[j];
      characters[j] = temp;
    }
    var result = characters.join('');
    if (result === string) {
      result = this.shuffle(string);
    }
    return result;
  }

  changeInput(text) {
    this.setState({userInput: text.target.value});
    if (text.target.value.toUpperCase() === this.state.word) {
      this.setState({position: this.state.position + 1});
      this.setState({word: data[this.state.position]});
      this.setState({userInput: ''});
      this.setState({score: this.state.score + 1});
      this.setState({shuffled: null});
      text.target.value = '';
    }
  }

  decrementTimer() {
    this.setState({timeLeft: this.state.timeLeft - 1});
    if (this.state.timeLeft <= 0) {
      clearInterval(this.interval);
      this.saveScore();
    }
  }

  componentDidMount() {
    this.interval = setInterval(this.decrementTimer.bind(this), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
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
    if (this.state.word) {
      this.state.shuffled = this.state.shuffled || this.shuffle(this.state.word);
    }
    return (
      <div>
        <Timer time={this.state.timeLeft} />
        <h1> {this.state.shuffled} </h1>
        <h2>Sramble Game here</h2>
        <input type="text" placeholder="Alert this" onChange={this.changeInput.bind(this)}/>
        <Score score={this.state.score}/>
      </div>
    );
  }
}
