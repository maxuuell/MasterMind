import React from 'react';
import $ from 'jquery';

export class Profile extends React.Component {
  constructor() {
    super();
    this.state = {
      username: "",
      highScoreMem: null,
      highscoreScram: null,
      memScores:[],
      scramScores:[]
    };
  }

  componentDidMount() {
    this.getUserInfo();
  }

  getUserInfo() {
    //hard code a username for now - can get the username from local.storage (or state, for persistence to work)
    //send a Get request to get the user info
    // $.ajax({
    //   method: 'GET',
    //   url: '/cloud',
    //   contentType: "application/json",
    //   dataType: 'json',
    //   success: function(data) {
    //     if (typeof data.redirect === 'string') {
    //       console.log("redirection from signup!");
    //       window.location = data.redirect;
    //     }
    //   }
    // });

    //assume we get the user info from the GET
    var userInfo = {
      username: "cloud",
      highScoreMem: 100,
      highscoreScram: 101,
      memScores: [100, 80],
      scramScores: [20, 20]
    };
    this.setState({
      username: userInfo.username,
      highScoreMem: userInfo.highScoreMem,
      highScoreScram: userInfo.highScoreScram,
      memScores:userInfo.memScores,
      scramScores:userInfo.scramScores
    });
  }


  scoreDisplay () {
    var OneGameScoreDisplay = ()=>(
      <div>
        <h2 className="text-center">Highest Memory Game Score: <span className="highscore">{this.state.highScoreMem}</span></h2>
      </div>
    );
    return (
      <OneGameScoreDisplay />
    );
  }


  displayProfile() {
    //-------constructing profile elements -------
    let profileElem;
    const NoScoreDisplay = (
      <h2 className="text-center">No Game score to display</h2>
    );
    //--------------------------------------------

    {console.log('inside displayProfile',this.state.memScores.length)}
    //the logics to decide what elements to display
    if (this.state.memScores.length === 0 && this.state.memScores.length === 0) {
      profileElem = (NoScoreDisplay);
    } else {
      profileElem = ( this.scoreDisplay());
    }
    return profileElem;
  }

  render() {
    console.log('memScores',this.state.memScores);
    var name = this.state.username.toUpperCase() + "'s";
    return (
      <div>
        <h1 className="text-center">{name} Profile</h1>
            {this.displayProfile()}
      </div>
    );
  }
}
