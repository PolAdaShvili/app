import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { USERS_FROM_DB } from '../constants';
import { Route,Switch } from "react-router";
import { langReducer } from "../actions/changeLang";
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import Form from '../components/Main/Form/Form';
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
    const { translations,setLang } = this.props;
    console.log(translations);
    return (
      <div className='App'>
        <Header
          configLang={ translations.header }
          setLang={ setLang }
        />
        <div className='Content'>
          <Switch>
            <Route
              exact
              path="/registration"
              render={()=><Form configLang={translations.main.form}/>}
            />
          </Switch>
        </div>
        <Footer
          configLang={ translations.footer }
        />
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    authorizationUser: state.changeLang.authorizationUser,
    translations: state.changeLang.translations
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
