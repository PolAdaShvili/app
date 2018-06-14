import React from 'react';
import { Form } from 'semantic-ui-react';


const InputBox = ({ label, placeHolder, type = 'text' }) => {
  return (
    <Form.Field>
      <label>{ label }</label>
      <input placeholder={ placeHolder } type={ type } />
    </Form.Field>
  )
};

export default InputBox;
