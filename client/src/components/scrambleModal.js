import { Modal, Button } from 'react-bootstrap'
import React from 'react';

export const ScrambleModal = ({
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
            <h4>JavaScript Scramble Game</h4>
            <p>The idea is simple. We scramble a word. You unscramble that word and type it in. Get it right, and you get another word. If you get stuck, you can always skip to the next word, but watch your score if you do!</p>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={()=>closeModal()}>Cancel</Button>
            <Button onClick={()=>startNewGame()}>Start New Game</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
};
