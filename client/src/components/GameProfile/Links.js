import React from 'react';
import { Button } from 'react-bootstrap';

export const Links = ({onGameChange}) => {
  return (
    <div>
      <Button bsStyle="primary" bsSize="small" className="btn-us" onClick={()=>onGameChange('nback')}>NBack</Button>
      <Button bsStyle="primary" bsSize="small" className="btn-us" onClick={()=>onGameChange('simon')}>Simon</Button>
      <Button bsStyle="primary" bsSize="small" className="btn-us" onClick={()=>onGameChange('scramble')}>Scramble</Button>
      <Button bsStyle="primary" bsSize="small" className="btn-us" onClick={()=>onGameChange('memory')}>Memory</Button>
    </div>
  )
}
