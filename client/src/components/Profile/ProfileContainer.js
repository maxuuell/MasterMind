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
      name: '',
      scores: [],
      loadingScores: false,
      profile: this.props.profile
    };
  }

  getProfileName(profile) {
    return profile ? `${profile.given_name}'s ` : '';
  }

  render() {
    return (
      <div>
        <h1 className="text-center">{this.getProfileName(this.state.profile)}Profile</h1>
        <ProfileHeader />
      </div>
    );
  }
}
