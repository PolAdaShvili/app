import React from 'react';
import { Dropdown, Flag } from 'semantic-ui-react';


const DropDownItem = ({ lang, val, handleEvent }) => {
  return (
    <Dropdown.Item
      data-lang={ lang }
      onClick={ handleEvent }
    >
      <Flag name={ lang }/>
      { val }
    </Dropdown.Item>
  )
};

export default DropDownItem;
