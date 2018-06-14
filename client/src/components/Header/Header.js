import React from 'react';
import { Divider, Container } from 'semantic-ui-react';
import LangDropDown from './LangDropdown';
import LogoReact from './LogoReact';


const Header = ({ configLang, setLang }) => {
  return (
    <header className='Header'>
      <LogoReact />
      <Container className='headerContainer'>
        <span>{ configLang.title }</span>
        <span>{ configLang.btnReg }</span>
      </Container>
      <LangDropDown
        configLang={ configLang.langParams }
        setLang={ setLang }
      />
      <Divider />
    </header>
  )
};

export default Header;
