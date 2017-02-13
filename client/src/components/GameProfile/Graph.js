import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

const transformData = (data) => {
  return data.map(el => {
    return {
      date: new Date(el.date).toLocaleDateString(),
      score: el.score
    }
  })
}

export const Graph = ({filteredGames}) =>
  <LineChart width={600} height={300} data={transformData(filteredGames)}
    margin={{top: 5, right: 30, left: 20, bottom: 5}}>
    <XAxis dataKey="date"/>
    <YAxis/>
    <CartesianGrid strokeDasharray="3 3"/>
    <Tooltip/>
    <Line type="monotone" dataKey="score" stroke="#8884d8" activeDot={{r: 8}}/>
  </LineChart>

