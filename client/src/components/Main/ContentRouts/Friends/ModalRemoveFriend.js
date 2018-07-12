import React from 'react';
import { Button, Icon, Modal } from 'semantic-ui-react';

const ModalRemoveFriend = ( {remove, close, configLang} ) => (
  <Modal
    className='ModalSuccessReg'
    defaultOpen={true}
    onUnmount={ close }
  >
    <Modal.Header>
      {configLang.deleteModalTitle}
    </Modal.Header>
    <Modal.Content>
      {configLang.deleteModalBody}
    </Modal.Content>
    <Modal.Actions>
      <Button
        negative
        content={configLang.no}
        onClick={ close }
      />
      <Button
        inverted
        color='green'
        onClick={ remove }
      >
        <Icon name='checkmark'/>
        {configLang.yes}
      </Button>
    </Modal.Actions>
  </Modal>
);

export default ModalRemoveFriend;
