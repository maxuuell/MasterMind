import React from 'react';

export const GameRow = ({date, score, level}) =>
  <tbody>
    <tr className='text-left'>
      <td>{new Date(date).toLocaleDateString()}</td>
      <td>{level ? `${score}%` : score}</td>
      {level ? <td>{level}</td> : null}
    </tr>
  </tbody>
