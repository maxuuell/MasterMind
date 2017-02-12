import React from 'react';
import { Button } from 'react-bootstrap';

export var Links = ({nback, simon, scramble, memory}) => {
  return (
    <div>
      <Button bsStyle="primary" bsSize="small" className="btn-us" onClick={nback}>NBack</Button>
      <Button bsStyle="primary" bsSize="small" className="btn-us" onClick={simon}>Simon</Button>
      <Button bsStyle="primary" bsSize="small" className="btn-us" onClick={scramble}>Scramble</Button>
      <Button bsStyle="primary" bsSize="small" className="btn-us" onClick={memory}>Memory</Button>
    </div>
  )
}