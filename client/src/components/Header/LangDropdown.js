import React from 'react';
import { Dropdown } from 'semantic-ui-react';
import DropDownItem from './DropdownItem'




const LangDropDown = ({ configLang, setLang }) => {
  const handleChangeLang = e => {
    setLang( e.target.getAttribute('data-lang') );
  };
  return (
    <div className='lang-box'>
      <Dropdown labeled icon='globe' direction='left' button className='lang'>
        <Dropdown.Menu>
          <Dropdown.Header icon='tags' content={ configLang.select }/>
          <Dropdown.Divider />
          { Object.keys(configLang).map((lang, index) => {
            if(index) {
              return (
                <DropDownItem key={ index } val={ configLang[lang] }
                  handleEvent={ handleChangeLang } lang={ lang }  />
              );
            }
          }) }
        </Dropdown.Menu>
      </Dropdown>
    </div>
  )
};

export default LangDropDown;
