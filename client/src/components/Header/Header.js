import React from 'react';
import { Link } from "react-router-dom";
import { Divider, Container, Button } from 'semantic-ui-react';
import LangDropDown from './LangDropdown';
import LogoReact from './LogoReact';






const Header = ({ configLang, setLang, auth, exit }) => {
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
          role='button'
          color='yellow'
          size='mini'
          onClick={exit}
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
