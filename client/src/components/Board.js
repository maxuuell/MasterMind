import React from 'react';
import { BoardItem } from './BoardItem.js';

export var Board = ({gameTitle, games}) => {
  return (
    <div>
      <h1>{gameTitle}</h1>
      {games.map((game, index) =>
        <BoardItem
          game={game}
          key={index} />
      )}
    </div>
  )
  
}