import React from 'react';
import { TableItem } from './TableItem.js';
import { Table } from 'react-bootstrap';

export var TableContainer = ({gameTitle, games}) => {
  return (
    <div>
      <h1>{gameTitle}</h1>
      <Table striped bordered condensed>
        <thead>
          <tr>
            <th>Rank</th>
            <th>Name</th>
            <th>Score</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {games.map((game, index) =>
            <TableItem
              game={game}
              key={index}
              index={index + 1} 
            />
          )}
        </tbody>
      </Table>
    </div>
  )
  
}