import React, { Component } from 'react';
import { Pagination } from 'react-bootstrap';
import { GameTable } from './GameTable';
import { fetchScores } from '../../helpers/fetchScores';

export default class GameProfileContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loadingData: false,
      filteredGames: [],
      gameName: this.props.location.pathname.split('/')[2],
      activePage: 1,
      profile: this.props.profile
    }
    this.getHeader = this.getHeader.bind(this)
    this.handleSelect = this.handleSelect.bind(this)
  }

  componentWillMount() {
    this.setState({loadingData: true});
    fetchScores(this.state.profile.email)
      .then(data => {
        data.json()
          .then(scores => {
            var filteredGames = scores.filter(game => game.gameName === this.state.gameName)
            this.setState({filteredGames, loadingData: false});
          })
      })
      .catch(error => this.setState({loadingData: false}))
  }

  getHeader() {
    return `${this.props.profile.given_name}'s ${this.state.gameName} Stats`;
  }

  handleSelect(eventKey) {
    this.setState({
      activePage: eventKey
    })
  }

  paginateScores() {
  }

  render() {
    return (
      <div className='text-center'>
        <h1>{this.getHeader()}</h1>
        <Pagination
          first
          last
          ellipsis
          boundaryLinks
          bsSize='medium'
          items={100}
          maxButtons={10}
          activePage={this.state.activePage}
          onSelect={this.handleSelect}
        />
      </div>
    )
  }
}
