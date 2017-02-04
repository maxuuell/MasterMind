import React from 'react';
import { data }  from './Data.js';

export default class GameScramble extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      userInput: '',
      position: 1,
      word: data[0],
      shuffled: undefined,
      score: 0
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
      this.setState({shuffled: undefined});
      text.target.value = '';
    }
  }
  render() {
    if (this.state.word) {
      this.state.shuffled = this.state.shuffled || this.shuffle(this.state.word);
    }
    return (
      <div>
      <h1> {this.state.shuffled} </h1>
      <h2>Sramble Game here</h2>
      <input type="text" placeholder="Alert this" onChange={this.changeInput.bind(this)}/>
      <h3>Score: {this.state.score} </h3>
      </div>
    );
  }
}
