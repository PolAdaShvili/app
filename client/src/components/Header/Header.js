import React from 'react';
import { Divider, Container } from 'semantic-ui-react';
import LangDropdown from './LangDropdown';
import LogoReact from './LogoReact';


const Header = () => {
  return (
    <header className='Header'>
      <LogoReact />
      <Container className='headerContainer'>
        <span>title</span>
        <span>registration</span>
      </Container>
      <LangDropdown />
      <Divider />
    </header>
  )
};

export default Header;
