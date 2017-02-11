import React from 'react';
import { Table } from 'react-bootstrap';
import { GameRow } from '../shared/GameRow';

export const GameTable = ({gameName, filteredGames}) => {
  return (
    <Table id={`#{gameName}-table`} striped>
      <thead>
        <tr>
          <th>Date</th>
          <th>Score</th>
        </tr>
      </thead>
      {filteredGames.map((game, i) => <GameRow key={i} date={game.date} score={game.score}/>)}
    </Table>
  )
}
