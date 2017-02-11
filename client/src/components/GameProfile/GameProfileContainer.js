import React, { Component } from 'react';

export default class GameProfileContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loadingData: false,
      filteredGames: [],
      gameName: this.props.location.pathname.split('/')[2]
    }
  }

  render() {
    return (
      <h1>GameProfileContainer</h1>
    )
  }
}
