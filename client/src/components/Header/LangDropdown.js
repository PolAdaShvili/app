import React from 'react';
import { Dropdown, Flag } from 'semantic-ui-react';


const handleChangeLang = (e) => {
  console.log(e.target);
};

const LangDropdown = () => {
  return (
    <div className='lang-box'>
      <Dropdown
        icon='globe'
        direction='left'
        button className='lang'>
        <Dropdown.Menu>
          <Dropdown.Header icon='tags' content='Select language' />
          <Dropdown.Divider />
          <Dropdown.Item
            data-lang='gb'
            onClick={handleChangeLang}
          >
            <Flag name='gb'/>
            English
          </Dropdown.Item>
          <Dropdown.Item
            data-lang='ua'
            onClick={handleChangeLang}
          >
            <Flag name='ua'/>
            Ukrainian
          </Dropdown.Item>
          <Dropdown.Item
            data-lang='ru'
            onClick={handleChangeLang}
          >
            <Flag name='ru'/>
            Russian
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </div>
  )
};

export default LangDropdown;
