import { Modal, Button } from 'react-bootstrap'
import React from 'react';

export const SimonModal = ({
    beginGame,
    startNewGame,
    closeModal,
    openModal,
    showModal,
  }) => {

    return (
      <div>
        <Button
          bsStyle="primary"
          bsSize="large"
          onClick={()=>openModal()}
        >
          Simon Settings
        </Button>

        <Modal show={showModal} onHide={()=>closeModal()}>
          <Modal.Header closeButton>
            <Modal.Title>Simon</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h4>Simon Game</h4>
            <p>Simon is the digital version of the classic, Simon says. Simon initiates a pattern using light and sound and you have to remember the order that Simon tells you. If you don't follow Simon's instructions, you lose!</p>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={()=>closeModal()}>Cancel</Button>
            <Button onClick={()=>startNewGame()}>Start New Game</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
};