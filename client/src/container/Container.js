import axios from 'axios';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route,Switch } from "react-router";
import { langReducer } from "../actions/changeLang";
import { addUserReducer, exitUserReducer } from '../actions/addUser';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import Form from '../components/Main/Form/Form';
import Aside from '../components/Main/Aside/Aside';
import Account from '../components/Main/ContentRouts/Account/Account';
import store from "../store";
import browserHistory from '../browserHistory'

class Container extends Component{
  constructor(props){
    super(props);

    this.state = {

    };
  }
  componentDidMount(){
    const token = localStorage.getItem('userToken');
    if(token){
      axios({
        method: 'get',
        url: '/api/user/auth',
        headers: {'authorization': token}
      }).then(res => {
        this.setState({token: res.token});
        this.porops.addUser(res);
      }).catch(err => {
        console.log('-CLIENT---NOT_authorization--->',err);
      });
    }
  }

  render(){
    console.log('CONTAINER--props-->',this.props);
    const { translations,setLang, exitUser, addUser } = this.props;
    const authUser = this.props.userInfo;

    return (
      <div className='App'>
        <Header
          configLang={ translations.header }
          setLang={ setLang }
          auth={ authUser.authorization }
          exit={ exitUser }
        />
        <div className='Content'>
          {location.href !== 'http://localhost:3000/registration' ?
            <Aside auth={authUser}/> :
            null}
          <Switch>
            <Route
              exact
              path="/registration"
              render={ () => <Form configLang={translations.main.form} addUser={ addUser } /> }
            />
            <Route
              path='/account'
              render={ () => <Account user={authUser}/> }
            />
            <Route
              path='/friends'
              render={ () => {return (<p>friends</p>)} }
            />
            <Route
              path='/people'
              render={ () => {return (<p>people</p>)} }
            />
            <Route
              path='/news'
              render={ () => {return (<p>news</p>)} }
            />
            <Route
              path='/setting'
              render={ () => {return (<p>setting</p>)} }
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
     }) );
     browserHistory.push({pathname: './'});
   },
   exitUser: () => {
     dispatch(exitUserReducer({}));
     browserHistory.push({pathname: './'});
   }
 }
};
store.subscribe(() => {
  console.log('subscribe --->', store.getState());
});

export default connect(mapStateToProps, mapDispatchToProps)(Container);
