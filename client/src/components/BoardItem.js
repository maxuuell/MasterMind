import React from 'react';
import { Row, Col } from 'react-bootstrap';

export var BoardItem = ({game}) => {
  return (
    <Row>
      <Col md={4}>{game.name}</Col><Col md={4}>{game.score}</Col><Col md={4}>{game.date}</Col>
    </Row> 
  )
}