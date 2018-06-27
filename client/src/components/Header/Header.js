import React from 'react';
import { Link } from "react-router-dom";
import { Divider, Container, Button } from 'semantic-ui-react';
import LangDropDown from './LangDropdown';
import LogoReact from './LogoReact';


const Header = ({ configLang, setLang, auth }) => {
  return (
    <header className='Header'>
      <LogoReact />
      <Container className='headerContainer'>
        <div className='homeBox'>
          <Button
            size='mini'
            content='Home'
            color='violet'
            className='btnHome'
          />
          <Link to='/' className='LinkHome' >HOME</Link>
        </div>
        {auth ? <Button
          color='yellow'
          size='mini'
          className='btnExit'
          content={ configLang.btnExit }
        /> : <div className='regBox'>
          <Button
            color='google plus'
            size='mini'
            className='btnReg'
            content={ configLang.btnReg }
          />
          <Link to='/registration' className='LinkReg' >Reg</Link>
        </div>}
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
