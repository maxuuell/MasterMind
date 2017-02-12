import { Modal, Button } from 'react-bootstrap'
import React from 'react';

export const MemoryModal = ({
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
          Memory Settings
        </Button>

        <Modal show={showModal} onHide={()=>closeModal()}>
          <Modal.Header closeButton>
            <Modal.Title>Memory</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h4>Matching Memory Game</h4>
            <p>
              MEMORY is a matching game where you have 30 seconds to find as many matching pairs on the grid as possible. Every time you find a matching pair, 
              your score goes up by 1.
            </p>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={()=>closeModal()}>Cancel</Button>
            <Button onClick={()=>startNewGame()}>Start New Game</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
};