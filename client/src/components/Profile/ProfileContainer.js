import React, { Component } from 'react';
import { ProfileHeader } from './ProfileHeader';

export default class ProfileContainer extends Component {
  constructor(props) {
    /**
     * state shape: {
     *  name: 'Cory',
     *  scores: [
     *    {name: '?',
     *    gameName: 'nback',
     *    score: 9000,
     *    level: 1,
     *    date: '1/12/2016'},
     *    {name: '?',
     *    gameName: 'nback',
     *    score: 9000,
     *    level: 1,
     *    date: '1/12/2016'}
     *  ],
     *  loadingScores: true,
     *  profile: auth0_profile // not sure if this is needed
     * }
     *
     */
    super(props);
    this.state = {
      loadingData: false,
      profile: this.props.profile,
      games: []
    };
  }

  componentWillMount() {
    this.setState({loadingData: true});
    fetch(`api/user/${this.state.profile.email}/scores`, {
      method: "GET",
      headers: new Headers({'Content-Type': 'application/json'})
    })
      .then(data => {
        data.json()
          .then(games => {
            this.setState({loadingData: false, games})
          })
      })
      .catch(e => {
        console.log('Error', e)
        this.setState({loadingData: false})
      })
  }

  getProfileName(profile) {
    return profile ? `${profile.given_name}'s ` : '';
  }

  render() {
    return (
      <div>
        <h1 className="text-center">{this.getProfileName(this.state.profile)}Profile</h1>
        <ProfileHeader totalGames={this.state.games.length}/>
      </div>
    );
  }
}
