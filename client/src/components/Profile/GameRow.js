import React from 'react';

export const GameRow = ({date, score}) =>
  <tbody>
    <tr className='text-left'>
      <td>{new Date(date).toLocaleDateString()}</td>
      <td>{score}</td>
    </tr>
  </tbody>
