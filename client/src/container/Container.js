import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { USERS_FROM_DB } from '../constants';
import { langReducer } from "../actions/changeLang";
import MainContent from './MainContent'
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import store from "../store";


class Container extends Component{
  componentDidMount(){
    axios.get( USERS_FROM_DB )
      .then((res) => {
        console.log('USERS--in DB-->', res.data);
      })
      .catch((err) => {
        console.log('Connection error. -> USERS', err);
      });
  }
  render(){
    const {fixedLang, lang, setLang } = this.props;
    return (
      <div className='App'>
        <Header
          configLang={ lang[fixedLang].header }
          setLang={ setLang }
        />
        <MainContent configLang={ lang[fixedLang].main } />
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
   setLang: (payload) => {
     dispatch(langReducer({
       fixedLang: payload
     }))
   }
 }
};
store.subscribe(() => {
  console.log('subscribe --->', store.getState());
});

export default connect(mapStateToProps, mapDispatchToProps)(Container);
