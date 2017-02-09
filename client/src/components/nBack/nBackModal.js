import { Popover, Tooltip, Modal, Button, SplitButton, MenuItem } from 'react-bootstrap'

export const NBackModal = React.createClass({
  getInitialState() {
    return { showModal: false };
  },

  close() {
    this.setState({ showModal: false });
  },

  open() {
    this.setState({ showModal: true });
  },

  render() {
    const popover = (
      <Popover id="modal-popover" title="popover">
        very popover. such engagement
      </Popover>
    );
    const tooltip = (
      <Tooltip id="modal-tooltip">
        wow.
      </Tooltip>
    );

    return (
      <div>
        <Button
          bsStyle="primary"
          bsSize="large"
          onClick={this.open}
        >
          n-Back Settings
        </Button>

        <Modal show={this.state.showModal} onHide={this.close}>
          <Modal.Header closeButton>
            <Modal.Title>Modal heading</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h4>n-Back</h4>
            <SplitButton bsSize="xsmall" title="n: How many back?" pullRight id="split-button-pull-right" onSelect={this.props.setN}>
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
            <p>Gameplay is simple. Push any key when the square that flashes matches the square that flashed n times ago. If you are playing 2 back and the squares light up in the order top, middle, top, you would hit a key after the second top, because it matches the square that lit up two moves ago.</p>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.close}>Close</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
});