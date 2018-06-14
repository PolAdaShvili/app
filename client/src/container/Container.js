import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { langReducer } from "../actions/changeLang";
import Main from './MainContent'
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import store from "../store";


class Container extends Component{
  componentDidMount(){
    axios.get('http://localhost:3001/api/users')
      .then((res) => {
        console.log('USERS-->', res.data);
      })
      .catch((err) => {
        console.log('Connection error. -> USERS', err);
      });
  }
  render(){
    console.log(this.props);
    const {fixedLang, lang, setLang } = this.props;
    return (
      <div className='App'>
        <Header
          configLang={ lang[fixedLang].header }
          setLang={ setLang }
        />
        <button onClick={ setLang }>ss</button>
        <Main />
        <Footer
          configLang={ lang[fixedLang].footer }
        />
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    authorizationUser: state.changeLang.authorizationUser,
    lang: state.changeLang.lang,
    fixedLang: state.changeLang.fixedLang
  }
};
const mapDispatchToProps = dispatch => {
 return {
   setLang: (val) => {
     console.log('!!!--->',val);
     dispatch(langReducer({
       fixedLang: val
     }))
   }
 }
};
store.subscribe(() => {
  console.log(store.getState());
});

export default connect(mapStateToProps, mapDispatchToProps)(Container);
