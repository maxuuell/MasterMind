import { Modal, Button } from 'react-bootstrap'
import React from 'react';

export const NBackModal = ({
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
          Scramble Settings
        </Button>

        <Modal show={showModal} onHide={()=>closeModal()}>
          <Modal.Header closeButton>
            <Modal.Title>Scramble</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h4>The Scramble Game</h4>
            <p>--Write Description--</p>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={()=>closeModal()}>Cancel</Button>
            <Button onClick={()=>startNewGame()}>Start New Game</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
};
