import React from 'react';
import { FormField, Label } from 'semantic-ui-react';

const FieldsInputs = ( {fieldName, val, eventHandler, fieldTitle, mode, corner = false} ) =>{
  return ( <div>
      <FormField>
        <Label content={ fieldTitle } corner={corner} />
        {mode === 'view' ? <input readOnly type="text" name={ fieldName } defaultValue={ val }/> :
          <input type="text" name={ fieldName } value={ val } onChange={ eventHandler }/>}
      </FormField>
    </div> )
};

export default FieldsInputs;