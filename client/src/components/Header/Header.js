import React from 'react';
import { Divider, Container, Button } from 'semantic-ui-react';
import LangDropDown from './LangDropdown';
import LogoReact from './LogoReact';


const handleClickReg = () => {
  console.log('click registration');
};

const Header = ({ configLang, setLang }) => {
  return (
    <header className='Header'>
      <LogoReact />
      <Container className='headerContainer'>
        <span>{ configLang.title }</span>
        <Button
          color='google plus'
          size='mini'
          content={ configLang.btnReg }
          onClick={ handleClickReg }
        />
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
