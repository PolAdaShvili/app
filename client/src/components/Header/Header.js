import React from 'react';
import { Link } from 'react-router-dom';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";;
import { Divider, Container, Button } from 'semantic-ui-react';
import LangDropDown from './LangDropdown';
import LogoReact from './LogoReact';


const handleClickReg = () => {

  console.log('click registration');
};

const Header = ({ configLang, setLang }) => {
  //const CustomLinkExample = () => (
  //  <Router>
  //    <div>
  //      <Route path="/about" component={About} activeOnlyWhenExact={true} to="/" label="Reg" />
  //    </div>
  //  </Router>
  );
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
        <Link to='Reg' >Reg </Link>
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
