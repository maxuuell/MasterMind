import React from 'react';
import { data }  from './Data.js';
import { Timer } from './Timer.js';
import { Score } from './Score.js';
import $ from 'jquery';
import {X_MASHAPE_KEY} from '../config.js';
import { ScrambleModal } from './scrambleModal';


const NUM_WORDS = 5;

export default class GameScramble extends React.Component {
  constructor(props) {
    super(props);
    this.gametype = 'scramble';
    this.profile = props.auth.getProfile();
    this.session = [];
    this.wordData = [];
    this.state = {
      userInput: '',
      position: 1,
      word: data[0],
      definition: null,
      shuffled: null,
      score: 0,
      timeLeft: 45,
      showModal: true
    };
    this.getWord = this.getWord.bind(this);
    this.shuffle = this.shuffle.bind(this);
    this.changeWord = this.changeWord.bind(this);
    this.changeInput = this.changeInput.bind(this);
    this.skipWord = this.skipWord.bind(this);
    this.decrementTimer = this.decrementTimer.bind(this);
    this.saveScore = this.saveScore.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
    this.componentWillUnmount = this.componentWillUnmount.bind(this)
    this.beginGame = this.beginGame.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.openModal = this.openModal.bind(this);
    this.startNewGame = this.startNewGame.bind(this);
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
    var THE_X_MASHAPE_KEY = process.env.X_MASHAPE_KEY || X_MASHAPE_KEY;
    $.ajax({
      type: 'GET',
      url: 'https://wordsapiv1.p.mashape.com/words/?random=true',
      headers: {
        'X-Mashape-Key': THE_X_MASHAPE_KEY,
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
      console.log(thisWord);
      this.setState({
        word: thisWord,
        definition: context.wordData[0].definition
      });
      context.wordData.shift();
    } else {
      var random;
      while (random === undefined) {
        var possible = Math.floor(Math.random()*data.length);
        if (context.session.indexOf(possible) === -1){
          context.session.push(possible);
          random = possible;
        }
      }
      var thisWord = data[random];
      this.setState({word: thisWord});
      this.setState({definition: ''});
    }
    this.setState({shuffled: this.shuffle(thisWord)});

  }

  changeInput(text) {
    var context = this;
    //console.log('the word in change input is ', this.state.word);
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
    alert("The game is over. Open the settings to start a new game!");
    //post the score to the backend if user is logged in
    console.log(this.state.score);
    if (this.profile) {
      var obj = {
        email: this.profile.email,
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
    //set the initial state for each new game
    var context = this;
    this.setState({
      userInput: '',
      position: 1,
      definition: null,
      score: 0,
      timeLeft: 45
    });
    this.changeWord(context);
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

  render() {
    // if (this.state.word) {
    //   this.state.shuffled = this.state.shuffled || this.shuffle(this.state.word);
    // }
    return (
      <div>
        <ScrambleModal
        beginGame={this.beginGame}
        startNewGame={this.startNewGame}
        closeModal={this.closeModal}
        openModal={this.openModal}
        showModal={this.state.showModal}
        />
        <Timer time={this.state.timeLeft} />
        <h1> {this.state.shuffled} </h1>
        <h4> {this.state.definition} </h4>
        <input type="text" placeholder="Enter Word" onChange={this.changeInput.bind(this)}/>
        <button className="btn btn-default skipButton" onClick={this.skipWord.bind(this)}>Skip</button>
        <Score score={this.state.score}/>
      </div>
    );
  }
}
