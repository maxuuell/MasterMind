import React from 'react';
import { Table } from 'react-bootstrap';
import { GameRow } from './GameRow';

export const NbackTable = ({filteredGames}) => {
  return (
    <Table id="nback-table">
      <h1>nBack</h1>
      <thead>
        <tr>
          <th>Date</th>
          <th>Score</th>
          <th>Level</th>
        </tr>
      </thead>
      {filteredGames.map((game, i) => <GameRow key={i} date={game.date} score={game.score} level={game.level}/>)}
    </Table>
  )
}
