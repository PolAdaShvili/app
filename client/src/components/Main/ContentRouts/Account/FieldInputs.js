import React from 'react';
import { FormField, Label } from 'semantic-ui-react';

const FieldsInput = ({ fieldName, val, eventHandler, fieldTitle, mode, corner = false, type = 'text' }) => {
  return ( <div>
    <FormField>
      <Label content={ fieldTitle } corner={ corner } />
      { mode === 'view' ?
        <input
          readOnly
          type={ type }
          name={ fieldName }
          defaultValue={ val }
          autoComplete='new_value'
        /> :
        <input
          type={ type }
          name={ fieldName }
          defaultValue={ val }
          onChange={ eventHandler }
          autoComplete='new_value'
        />
      }

    </FormField>
  </div> )
};

export default FieldsInput;
