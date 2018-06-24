import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { USERS_FROM_DB } from '../constants';
import { Route,Switch } from "react-router";
import { langReducer } from "../actions/changeLang";
import { addUserReducer } from "../actions/addUser";
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import Aside from '../components/Main/Aside';
import Form from '../components/Main/Form/Form';
import store from "../store";


class Container extends Component{
  render(){
    console.log('CONTAINER---->',this.props);
    const { translations,setLang, addUser, authorizationUser, userInfo } = this.props;
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
              render={()=><Form configLang={translations.main.form} addUserFunc={addUser}/>}
            />
            <Aside authorization={authorizationUser} userInfo={userInfo}/>
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
    authorizationUser: state.addUser.authorization,
    userInfo: state.addUser.userInfo,
    translations: state.changeLang.translations
  }
};
const mapDispatchToProps = dispatch => {
 return {
   setLang: payload => {
     dispatch(langReducer({
       fixedLang: payload
     }))
   },
   addUser: payload => {
     dispatch(addUserReducer({
       authorization : true,
       user: payload.data
     }))
   }
 }
};
store.subscribe(() => {
  console.log('subscribe --->', store.getState());
});

export default connect(mapStateToProps, mapDispatchToProps)(Container);
