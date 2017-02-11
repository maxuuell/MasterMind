import React from 'react';

export var TableItem = ({game, index}) => {
  return (
    <tr>
      <td>{index}</td>
      <td>{game.name}</td>
      <td>{game.score}</td>
      <td>{game.date}</td>
    </tr>
  )

}