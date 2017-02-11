import React, { Component } from 'react';
import { Pagination } from 'react-bootstrap';

export default class GameProfileContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loadingData: false,
      filteredGames: [],
      gameName: this.props.location.pathname.split('/')[2],
      activePage: 1
    }
    this.getHeader = this.getHeader.bind(this)
    this.handleSelect = this.handleSelect.bind(this)
  }

  getHeader() {
    return `${this.props.profile.given_name}'s ${this.state.gameName} Stats`;
  }

  handleSelect(eventKey) {
    this.setState({
      activePage: eventKey
    })
  }

  render() {
    return (
      <div className='text-center'>
        <h1 className='text-center'>{this.getHeader()}</h1>
        <Pagination
          bsSize='medium'
          items={10}
          activePage={this.state.activePage}
          onSelect={this.handleSelect}
        />
      </div>
    )
  }
}
