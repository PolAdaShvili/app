import React from 'react';
import { Link } from "react-router-dom";
import { Container, Button } from 'semantic-ui-react';
import LangDropDown from './LangDropdown';
import LogoReact from './LogoReact';


const Header = ({ configLang, setLang, auth, exit }) => {
  return (
    <header className='Header'>
      <LogoReact />
      <Container className='headerContainer'>
        <div className='homeBox'>
          <Button size='mini' className='btnHome' content={ configLang.btnHome }/>
          <Link to='/' className='LinkHome'/>
        </div>
        {auth ? <Button role='button' size='mini' onClick={exit}
          className='btnExit' content={ configLang.btnExit }/> :
          <div className='regBox'>
            <Button size='mini' color='google plus' className='btnReg' content={ configLang.btnReg }/>
            <Link to='/registration' className='LinkReg'/>
          </div>}
      </Container>
      <LangDropDown configLang={ configLang.langParams } setLang={ setLang }/>
    </header>
  )
};

export default Header;
