import React from 'react';
import { Table } from 'react-bootstrap';
import { GameRow } from '../shared/GameRow';

export const NbackTable = ({filteredGames}) => {
  return (
    <div>
      <h1>nBack</h1>
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
