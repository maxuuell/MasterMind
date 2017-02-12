import React from 'react';

export const GameRow = ({date, score, game}) =>
  <tbody>
    <tr className='text-left'>
      <td>{new Date(date).toLocaleDateString()}</td>
      <td>{game.level ? `${score}%` : score}</td>
      {game.level ? <td>{game.level}</td> : null}
    </tr>
  </tbody>
