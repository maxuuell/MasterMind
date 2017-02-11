import { Popover, Tooltip, Modal, Button, SplitButton, MenuItem } from 'react-bootstrap'
import React from 'react';

export const NBackModal = ({
    setN,
    beginGame,
    startNewGame,
    closeModal,
    openModal,
    showModal,
    modalSelector
  }) => {

    return (
      <div>
        <Button
          bsStyle="primary"
          bsSize="large"
          onClick={()=>openModal()}
        >
          n-Back Settings
        </Button>

        <Modal show={showModal} onHide={()=>closeModal()}>
          <Modal.Header closeButton>
            <Modal.Title>n-Back</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <SplitButton bsSize="xsmall" title={modalSelector} pullRight id="split-button-pull-right" onSelect={setN}>
              <MenuItem eventKey="1">1</MenuItem>
              <MenuItem eventKey="2">2</MenuItem>
              <MenuItem eventKey="3">3</MenuItem>
              <MenuItem eventKey="4">4</MenuItem>
              <MenuItem eventKey="5">5</MenuItem>
              <MenuItem eventKey="6">6</MenuItem>
              <MenuItem eventKey="7">7</MenuItem>
              <MenuItem eventKey="8">8</MenuItem>
            </SplitButton>
            <h4>The n-Back Game</h4>
            <p>Gameplay is simple. Click anywhere on the board when the square that flashes matches the square that flashed n times ago. If you are playing 2 back and the squares light up in the order top, middle, top, you would hit a key after the second top, because it matches the square that lit up two moves ago.</p>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={()=>closeModal()}>Cancel</Button>
            <Button onClick={()=>startNewGame()}>Start New Game</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
};
