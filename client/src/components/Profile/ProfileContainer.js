import React, { Component } from 'react';
import { ProfileHeader } from './ProfileHeader';
import { Games } from './Games';
import { Table } from 'react-bootstrap';
import { GAMES } from '../../constants/games';

export default class ProfileContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loadingData: false,
      profile: this.props.profile,
      games: []
    };
    this.filterGamesByName = this.filterGamesByName.bind(this);
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

  filterGamesByName(name) {
    var filteredGames = this.state.games.filter(game => {
      return game.gameName === name
    })

    var sorted = filteredGames.sort(g => new Date(g.date))
    return sorted.slice(0,5);
  }

  render() {
    return (
      <div>
        <h1 className="text-center">{this.getProfileName(this.state.profile)}Profile</h1>
        <ProfileHeader totalGames={this.state.games.length}/>
          {GAMES.map((name, i) => {
            var filtered = this.filterGamesByName(name);
            return <Games key={i} gameName={name} filteredGames={filtered}/>;
          })}
      </div>
    );
  }
}
