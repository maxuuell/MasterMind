import React from 'react';

export const GameRow = ({date, score, game}) =>
  <tbody>
    <tr className='text-left'>
      <td>{new Date(date).toLocaleDateString()}</td>
      <td>{game.gameName === 'nback' ? `${score}%` : score}</td>
      {game.gameName === 'nback' ? <td>{game.level}</td> : null}
    </tr>
  </tbody>
