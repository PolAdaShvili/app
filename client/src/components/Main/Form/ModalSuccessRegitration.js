import React from 'react';
import { Button, Modal, Icon } from 'semantic-ui-react';


const ModalSuccessRegitration = ({ psw, login , eventClick }) => (
  <Modal
    defaultOpen={true}
    onUnmount={ eventClick }
  >
    <Modal.Header>
      Congratulations you are registered!
    </Modal.Header>
    <Modal.Content>
      <p>
        Your login is your mail: <strong>{ login }</strong>
        <br/>
        Your password: <strong>{ psw }</strong>
      </p>
    </Modal.Content>
    <Modal.Actions>
      <Button
        inverted
        color='green'
        onClick={ eventClick }
      >
        <Icon name='checkmark' /> Yes
      </Button>
    </Modal.Actions>
  </Modal>
);

export default ModalSuccessRegitration;