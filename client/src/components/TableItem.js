import React from 'react';

export var TableItem = ({game, index}) => {
  return (
    <tr>
      <td>{index}</td>
      <td>{game.userName}</td>
      <td>{game.score}</td>
      <td>{new Date(game.date).toLocaleDateString()}</td>
    </tr>
  )

}