import React from 'react';
import { Form,  Message } from 'semantic-ui-react';


const InputBox = ({ label, placeHolder, type = 'text', onChange, name, required = true, className = ''}) => {
  return (
    <Form.Field>
      <label>{ label }</label>
      <input
        type={ type }
        className={className}
        placeholder={ placeHolder }
        onChange={ onChange }
        name={ name }
        required={ required }
      />
    </Form.Field>
  )
};

export default InputBox;
