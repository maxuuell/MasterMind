import React, { Component } from 'react';

export class Profile extends Component {
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
      name: '',
      scores: [],
      loadingScores: false,
      profile: this.props.profile
    };
  }

  getProfileName(profile) {
    //TODO better way to get profile through components
    console.log('profile', profile);
    return profile ? `${profile.given_name}'s ` : '';
  }

  render() {
    return (
      <div>
        <h1 className="text-center">{this.getProfileName(this.state.profile)}Profile</h1>
      </div>
    );
  }
}
