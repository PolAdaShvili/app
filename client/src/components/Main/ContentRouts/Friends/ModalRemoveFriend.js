import React from 'react';
import { Button, Modal, Icon } from 'semantic-ui-react';


const ModalRemoveFriend = ({ remove, close }) => (
  <Modal
    className='ModalSuccessReg'
    defaultOpen={true}
    onUnmount={ close }
  >
    <Modal.Header>
      Delete Friend
    </Modal.Header>
    <Modal.Content>
      <p>
        do you want to delete a friend ?
      </p>
    </Modal.Content>
    <Modal.Actions>
      <Button
        negative
        content='No'
        onClick={ close }
      />
      <Button
        inverted
        color='green'
        onClick={ remove }
      >
        <Icon name='checkmark' /> Yes
      </Button>
    </Modal.Actions>
  </Modal>
);

export default ModalRemoveFriend;