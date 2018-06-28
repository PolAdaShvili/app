import axios from 'axios';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route,Switch } from "react-router";
import { langReducer } from "../actions/changeLang";
import { addUserReducer, exitUserActions } from '../actions/addUser';
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
      })
      .then(res => {
        this.setState({token: res.token});
        console.log('get_/API/user/auth-->', res );
      })
      .catch(err => {
        console.log('get_ERRORS___/API/user/auth-->', err);
      })
    }
  }

  render(){
    const { translations, setLang, exitUser, addUser, auth, user } = this.props;
    console.log('CONTAINER--props-->',this.props);

    return (
      <div className='App'>
        <Header
          configLang={ translations.header }
          setLang={ setLang }
          auth={ auth }
          exit={ exitUser }
        />
        <div className='Content'>
          { location.href !== 'http://localhost:3000/registration' ?
            <Aside auth={ auth }/> :
            null }
          <Switch>
            <Route
              exact
              path="/registration"
              render={ () => <Form configLang={translations.main.form} addUser={ addUser } /> }
            />
            <Route
              path='/account'
              render={ () => <Account user={ user }/> }
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
    user: state.addUser.userInfo.user,
    auth: state.addUser.authorization,
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
     console.log( '-1.payload->', payload );
     dispatch(addUserReducer({
       authorization : true,
       userInfo: payload
   }))
     localStorage.getItem( 'userToken', payload.token );
     browserHistory.push({pathname: './'});
   },
   exitUser: () => {
     dispatch(exitUserActions({}));
     browserHistory.push({pathname: './'});
   }
 }
};
store.subscribe(() => {
  console.log('subscribe --->', store.getState());
});

export default connect(mapStateToProps, mapDispatchToProps)(Container);
