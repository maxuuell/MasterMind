import React, { Component } from 'react';
import { ProfileHeader } from './ProfileHeader';
import { Games } from './Games';
import { NbackTable } from './NbackTable';
import { Table } from 'react-bootstrap';
import { GAMES } from '../../constants/games';
import { fetchScores } from '../../helpers/fetchScores';

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
    fetchScores(this.state.profile.email)
      .then(data => {
        data.json()
          .then(games => {
            this.setState({games, loadingData: false})
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
    });

    var sorted = filteredGames.sort((a,b) => {
      return new Date(b.date) - new Date(a.date)
    });
    return sorted.slice(0,5);
  }

  render() {
    const nBackGames = this.filterGamesByName('nback');
    if (this.state.loadingData) {
      return <img className='center-block' src='/assets/img/loading.gif' />
    } else {
      return (
        <div>
          <h1 className="text-center">{this.getProfileName(this.state.profile)}Profile</h1>
          <ProfileHeader totalGames={this.state.games.length} />
          {GAMES.map((name, i) => {
            var filtered = this.filterGamesByName(name);
            return <Games key={i} gameName={name} filteredGames={filtered}/>;
          })}
          <NbackTable filteredGames={nBackGames} />
        </div>
      );
    }
  }
}
