import React, { Component } from 'react';

export default class GameProfileContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loadingData: false,
      filteredGames: [],
      gameName: this.props.location.pathname.split('/')[2]
    }
    this.getHeader = this.getHeader.bind(this)
  }

  getHeader() {
    return `${this.props.profile.given_name}'s ${this.state.gameName} Stats`;
  }

  render() {
    return (
      <h1 className='text-center'>{this.getHeader()}</h1>
    )
  }
}
