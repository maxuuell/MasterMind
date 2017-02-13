import React from 'react';
import { Table } from 'react-bootstrap';
import { GameRow } from '../shared/GameRow';

export const GameTable = ({gameName, filteredGames}) => {
  // TODO fix props in GameRow
  return (
    <Table id={`#{gameName}-table`} striped>
      <thead>
        <tr>
          <th>Date</th>
          <th>Score</th>
          {gameName === 'nback' ? <th>Level</th> : null}
        </tr>
      </thead>
      {filteredGames.map((game, i) => <GameRow key={i} date={game.date} score={game.score} game={game} />)}
    </Table>
  )
}
