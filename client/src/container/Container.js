import axios from 'axios';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route,Switch } from "react-router";
import { langReducer } from "../actions/changeLang";
import { addUserReducer } from "../actions/addUser";
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import Aside from '../components/Main/Aside';
import Form from '../components/Main/Form/Form';
import store from "../store";


class Container extends Component{
  componentDidMount(){
    const token = localStorage.getItem('userToken');
    if(token){
      axios({
        method: 'get',
        url: '/api/auth',
        headers: {'authorization': token}
      }).then(res => {
        // add user in store
        this.props.addUser(res);
        //
      }).catch(err => {
        console.log('-CLIENT---NOT_authorization--->',err);
      });
    }
  }

  render(){
    console.log('CONTAINER--props-->',this.props);
    const { translations,setLang } = this.props;
    const authUser = this.props.userInfo;


    return (
      <div className='App'>
        <Header
          configLang={ translations.header }
          setLang={ setLang }
          auth={authUser.authorization}
        />
        <div className='Content'>
          <Switch>
            <Route
              exact
              path="/registration"
              render={()=><Form configLang={translations.main.form}/>}
            />
            <Aside auth={authUser}/>
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
