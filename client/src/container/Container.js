import axios from 'axios';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route,Switch } from "react-router";
import { langReducer } from "../actions/changeLang";
import { addUserReducer, exitUserActions, signInUserActions } from '../actions/addUser';
import { HOST_URL } from '../constants';
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
  }

  componentDidMount(){
    if ( localStorage.getItem('token') ) {

      const token = localStorage.getItem( 'token' );
      axios({
        method: 'get', url: '/api/user/auth',
        headers: { 'authorization': token }
      })
      .then( res =>{
        this.props.addUser(res.data)
      }).catch(err => {
        console.log( err );
      })
    }
  }

  render(){
    const { translations, setLang, exitUser, addUser, auth, user, signUser } = this.props;

    return (
      <div className='App'>
        <Header
          configLang={ translations.header }
          setLang={ setLang }
          auth={ auth }
          exit={ exitUser }
        />

        <div className='Content'>
          {location.href !== `${ HOST_URL }/registration` ?
            <Aside auth={ auth } addUser={ addUser } /> :
            null}
          <Switch>
            <Route
              exact
              path="/registration"
              render={() => <Form configLang={translations.main.form} signUser={ signUser } addUser={ addUser } />}
            />
            <Route
              path='/account'
              render={() => <Account user={ user } addUser={ addUser } />}
            />
            <Route
              path='/friends'
              render={() => {return ( <p>friends</p> )}}
            />
            <Route
              path='/people'
              render={ () => {return (<p>people</p>)} }
            />
            <Route
              path='/news'
              render={() => { return (<p>news</p>) }}
            />
            <Route
              path='/setting'
              render={() => { return (<p>setting</p> )}}
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
    userInfo: state.addUser,
    signUser: state.addUser.signUser,
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
       user: payload
   }))
     browserHistory.push({pathname: './'});
   },
   signUser: payload => {
     console.log( 'step1-payload', payload );
     dispatch(signInUserActions({
       user: payload
     }))
     browserHistory.push({pathname: './'});
   },
   exitUser: () => {
     dispatch(exitUserActions({}));
     localStorage.removeItem('token');
     browserHistory.push({pathname: './'});
   }
 }
};

export default connect(mapStateToProps, mapDispatchToProps)(Container);
