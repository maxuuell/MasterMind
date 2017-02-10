import React from 'react';
import { Button } from 'react-bootstrap';

export var Links = ({nback, simon, scramble, memory}) => {
  return (
    <div>
      <Button bsStyle="Primary" bsSize="small" onClick={nback}>NBack</Button>
      <Button bsStyle="Primary" bsSize="small" onClick={simon}>Simon</Button>
      <Button bsStyle="Primary" bsSize="small" onClick={scramble}>Scramble</Button>
      <Button bsStyle="Primary" bsSize="small" onClick={memory}>Memory</Button>
    </div>
  )
}