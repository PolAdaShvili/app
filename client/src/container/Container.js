import axios from 'axios';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route,Switch } from "react-router";
import Form from './Form';
import Account from './Account';
import Friends from './Friends';
import ViewUser from './ViewUser';
import News from './News';
import SearchPeople from './SearchPeople';
import Setting from "./Setting";
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import Aside from '../components/Main/Aside/Aside';
import { langReducer } from "../actions/changeLang";
import store from "../store";
import { HOST_URL } from '../constants';
import browserHistory from '../browserHistory'
import { addUserReducer, exitUserActions, addFriendActions,
  removeFriendAction, setNewsAction } from '../actions/addUser';


class Container extends Component{
  constructor(props){
    super(props);
  }
  componentDidMount(){
    const token = localStorage.getItem( 'token' );

    if ( token ) {
      axios({
        method: 'get', url: '/api/user',
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
    const { translations, setLang, exitUser, addUser, auth, user,
      signUser, friends, addFriend, removeFriend, setNews } = this.props;

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
              render={ () => <Account user={ user } addUser={ addUser }/> }
            />
            <Route
              path='/friends'
              render={ () => <Friends user={ user } removeFriend={ removeFriend }/> }
            />
            <Route
              path='/people'
              render={ () => <SearchPeople addFriend={ addFriend } user={ user }/> }
            />
            <Route
              path='/news'
              render={ () => <News setNews={ setNews } user={ this.props.user }/> }
            />
            <Route
              path='/viewprofile'
              render={ () => <ViewUser/> }
            />
            <Route
              path='/setting'
              render={() => <Setting/>}
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
   addFriend: payload => {
     dispatch(addFriendActions({payload}))
     const formData = new FormData;
     formData.append('friends', payload)
     axios({
       method: 'post', url: '/api/user/friends',
       headers: {'Content-Type': 'multipart/form-data', authorization: localStorage.getItem( 'token' ) },
       data: formData
     }).catch(err => { console.log( err ) })
   },
   removeFriend: payload => {
     dispatch(removeFriendAction({ payload }))
     const formDta = new FormData;
     formDta.append('friend', payload)
     axios({
       method: 'put', url: '/api/user/friends',
       headers: {'Content-Type': 'multipart/form-data', authorization: localStorage.getItem( 'token' ) },
       data: formDta
     }).catch(err => { console.log( err ) })
   },
   setNews: payload => {
     console.log( '---step-1----',payload );
     dispatch(setNewsAction({payload}))
   },
   exitUser: () => {
     dispatch(exitUserActions({}));
     localStorage.removeItem('token');
     browserHistory.push({pathname: './'});
   }
 }
};

export default connect(mapStateToProps, mapDispatchToProps)(Container);
