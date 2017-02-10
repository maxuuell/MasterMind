import React from 'react';

export const GameTableHeader = ({gameName}) =>
  <thead>
    <h1>{gameName}</h1>
    <tr>
      <th>Date</th>
      <th>Score</th>
    </tr>
  </thead>
