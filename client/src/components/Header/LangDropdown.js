import React from 'react';
import { Dropdown } from 'semantic-ui-react';
import DropDownItem from './DropdownItem'


const LangDropDown = ({ configLang, setLang }) => {
  function handleChangeLang (e) {
    const val = e.target.getAttribute('data-lang');
    setLang( val );
  }
  return (
    <div className='lang-box'>
      <Dropdown
        icon='globe'
        labeled
        direction='left'
        button className='lang'>
        <Dropdown.Menu>
          <Dropdown.Header
            icon='tags'
            content={ configLang.select }
          />
          <Dropdown.Divider />
          { Object.keys(configLang).map((lang, index) => {
            if(index) {
              return (<DropDownItem
                  key={ index }
                  lang={ lang }
                  val={ configLang[lang] }
                  handleEvent={ handleChangeLang }
                />);
            }
          }) }
        </Dropdown.Menu>
      </Dropdown>
    </div>
  )
};

export default LangDropDown;
