import React from 'react';
import { Table } from 'react-bootstrap';
import { GameRow } from '../shared/GameRow';

export const Games = ({gameName, filteredGames}) => {
  //TODO fix props in GameRow
  return (
    <div className="center-block ourTable">
      <h1>{gameName}</h1>
      <Table id={`#{gameName}-table`} condensed striped>
        <thead>
          <tr>
            <th>Date</th>
            <th>Score</th>
          </tr>
        </thead>
        {filteredGames.map((game, i) => <GameRow key={i} date={game.date} score={game.score} game={game}/>)}
      </Table>
    </div>
  )
}
