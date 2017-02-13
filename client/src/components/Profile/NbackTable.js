import React from 'react';
import { Table } from 'react-bootstrap';
import { GameRow } from '../shared/GameRow';
import { Link } from 'react-router';

export const NbackTable = ({filteredGames}) => {
  return (
    <div className="ourTable center-block">
      <Link to="/profile/nback">
        <h1>nBack</h1>
      </Link>
      <Table id="nback-table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Score</th>
            <th>Level</th>
          </tr>
        </thead>
        {filteredGames.map((game, i) => <GameRow key={i} date={game.date} score={game.score} level={game.level} game={game}/>)}
      </Table>
    </div>
  )
}
