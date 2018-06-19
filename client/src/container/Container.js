import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { USERS_FROM_DB } from '../constants';
import { Route,Switch } from "react-router";
import { langReducer } from "../actions/changeLang";
import { addUserReducer } from "../actions/addUser";
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import Form from '../components/Main/Form/Form';
import store from "../store";


class Container extends Component{
  //componentDidMount(){
  //  axios.get( USERS_FROM_DB )
  //    .then((res) => {
  //      console.log('USERS--in DB-->', res.data);
  //    })
  //    .catch((err) => {
  //      console.log('Connection error. -> USERS', err);
  //    });
  //}

  render(){
    const { translations,setLang, addUser } = this.props;
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
