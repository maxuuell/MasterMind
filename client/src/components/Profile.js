import React from 'react';
import $ from 'jquery';

export class Profile extends React.Component {
  constructor() {
    super();
    this.state = {
      username: "",
      highScoreMem: null,
      highScoreScram: null,
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
      username: 'cloud',
      highScoreMem: 100,
      highScoreScram: 101,
      memScores: [100, 200],
      scramScores: [101]
    };

    // var gamesPlayed = ()=>{
    //   var games =[];
    //   if (userInfo.memScores.length !== 0) {
    //     games.push('');
    //   }

    // };

    this.setState({
      username: userInfo.username,
      highScoreMem: userInfo.highScoreMem,
      highScoreScram: userInfo.highScoreScram,
      memScores: userInfo.memScores,
      scramScores: userInfo.scramScores
    });
  }


  scoreDisplay () {
    //---- Element for displaying one game ----
    var OneGameScoreDisplay = ({gameType, score, scoreArr})=>(
      <div>
        <h2 className="text-center">Highest {gameType} Game Score: <span className="highscore">{score}</span></h2>

        <div className="table-responsive">
          <table className="table">
            <tbody>
              <tr>
                <th>#</th>
                {
                  scoreArr.map((eachScore, ind)=>{
                    return <TableCol value={ind + 1} key={ind}/>;
                  })
                }
              </tr>
              <tr>
                <th>Score</th>
                {
                  scoreArr.map((eachScore, ind)=>{
                    return <TableCol value={eachScore} key={eachScore}/>;
                  })
                }
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );

    var TableCol = ({value}) =>(
      <td>{value}</td>
    );

    var OneGameScoreArrayDisplay = ({score, ind})=>{
      console.log('Inside GameArray Display score:', score, 'ind:',ind);
      return(
        <div className="table-responsive">
          <table className="table">
            <tbody>
              <tr>
                <th>#</th>
                <td>{ind}</td>
              </tr>
              <tr>
                <th>Score</th>
                <td>{score}</td>
              </tr>
            </tbody>
          </table>
        </div>
      );
    };
    //------------------------------------
    //---- Logics for displaying game elem--
    //--- Potentially refactor for the games to reside in one array for easy data manipulation
    let gameDisplay = [];
    if (this.state.memScores.length !== 0) {
      gameDisplay.push(<OneGameScoreDisplay gameType='Memory' score={this.state.highScoreMem} scoreArr={this.state.memScores} key='Memory' />);

    }
    if (this.state.scramScores.length !== 0) {
      gameDisplay.push(<OneGameScoreDisplay gameType='Scramble' score={this.state.highScoreScram} scoreArr={this.state.scramScores} key='Scramble' />);
    }

    return (
      <div>
        {gameDisplay}
        {this.state.memScores.map((score, ind)=>{
          console.log('score:', score.toString(), 'ind:', ind);

          return <OneGameScoreArrayDisplay score={score} ind={ind} key={ind.toString()} />;
        })}

      </div>
    );
  }


  displayProfile() {
    //-------constructing profile elements -------
    let profileElem;
    const NoScoreDisplay = (
      <h2 className="text-center">No Game score to display</h2>
    );
    //--------------------------------------------

    {console.log('inside displayProfile',this.state.memScores.length);}
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
