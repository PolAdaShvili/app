import React from 'react';
import { Link } from "react-router-dom";
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
        <Link to='/' >HOME</Link>
        <div className='regBox'>
          <Button
            color='google plus'
            size='mini'
            content={ configLang.btnReg }
            onClick={ handleClickReg }
          />
          <Link to='/registration' className='LinkReg' >Reg </Link>
        </div>
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
