import React from 'react';
import { data }  from './Data.js';
import { Timer } from './Timer.js';
import { Score } from './Score.js';
import $ from 'jquery';
import {X_MASHAPE_KEY} from '../config.js';

const NUM_WORDS = 20;

export default class GameScramble extends React.Component {
  constructor(props) {
    super(props);
    this.gametype = 'scramble';
    this.wordData = [];
    this.state = {
      userInput: '',
      position: 1,
      word: data[0],
      definition: null,
      shuffled: null,
      score: 0,
      timeLeft: 60
    };
    //send a GET for random word
    var context = this;
    for (var i = 0; i < NUM_WORDS; i++) {
      this.getWord( function(word) {
        context.wordData.push(word);
      });
    }
  }

  //returns a word and a definition
  getWord(callback) {
    var word = {};
    var context = this;
    $.ajax({
      type: 'GET',
      url: 'https://wordsapiv1.p.mashape.com/words/?random=true',
      headers: {
        'X-Mashape-Key': X_MASHAPE_KEY,
        Accept: 'application/json'
      },
      contentType: 'application/json',
      success: function(data) {
        //sometimes API returns result without definition, handle that
        if (!data.results) {
          console.log('word without definiton! try again');
          context.getWord(callback);
        } else {
          word.word = data.word.toUpperCase();
          word.definition = data.results[0].definition;
          callback(word);
        }
      }
    });
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

  changeWord(context) {
    if (context.wordData.length > 0) {
      var thisWord = context.wordData[0].word;
      this.setState({
        word: thisWord,
        definition: context.wordData[0].definition
      });
      context.wordData.shift();
    } else {
      var thisWord = data[this.state.position];
      this.setState({position: this.state.position + 1});
      this.setState({word: thisWord});
    }
    this.setState({shuffled: this.shuffle(thisWord)});

  }

  changeInput(text) {
    var context = this;
    console.log('the word in change input is ', this.state.word);
    this.setState({userInput: text.target.value});
    if (text.target.value.toUpperCase() === this.state.word) {
      this.changeWord(context);
      this.setState({userInput: ''});
      this.setState({score: this.state.score + 1});
      text.target.value = '';
    }
  }

  skipWord() {
    this.setState({score: this.state.score - 1});
    this.changeWord(this);
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
    this.setState({shuffled: this.shuffle(this.state.word)});
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
    // if (this.state.word) {
    //   this.state.shuffled = this.state.shuffled || this.shuffle(this.state.word);
    // }
    return (
      <div>
        <Timer time={this.state.timeLeft} />
        <h1> {this.state.shuffled} </h1>
        <h4> {this.state.definition} </h4>
        <input type="text" placeholder="Alert this" onChange={this.changeInput.bind(this)}/>
        <button className="skipButton" onClick={this.skipWord.bind(this)}>Skip</button>
        <Score score={this.state.score}/>
      </div>
    );
  }
}
