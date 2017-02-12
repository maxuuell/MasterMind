import React from 'react';
import { Table } from 'react-bootstrap';
import { GameRow } from '../shared/GameRow';

const isNback = (games) => {
  if(!games[0]) { return false; }
  return games[0].level ? true : false;
}

export const GameTable = ({gameName, filteredGames}) => {
  // TODO fix props in GameRow
  return (
    <Table id={`#{gameName}-table`} striped>
      <thead>
        <tr>
          <th>Date</th>
          <th>Score</th>
          {isNback(filteredGames) ? <th>Level</th> : null}
        </tr>
      </thead>
      {filteredGames.map((game, i) => <GameRow key={i} date={game.date} score={game.score} game={game} />)}
    </Table>
  )
}
