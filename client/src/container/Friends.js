import React, { Component } from 'react';
import axios from 'axios';
import Friend from '../components/Main/ContentRouts/Friends/Friend';


class Friends extends Component {
  constructor(props){
    super(props);
    this.state = {
      friends: [],
      filter: [],
      modal: false
    }

    this.getFriends = this.getFriends.bind(this);
    this.friendRemove = this.friendRemove.bind(this);
    this.clickModalRemove = this.clickModalRemove.bind(this);
    this.closeModalRemove = this.closeModalRemove.bind(this);
    this.handleInputSearch = this.handleInputSearch.bind(this);
  }
  componentDidMount(){
    this.props.user ? this.getFriends() : null;
  }

  getFriends(){
    axios({
      method: 'get', url: '/api/user/friends',
      headers: {'Content-Type': 'multipart/form-data', authorization: localStorage.getItem( 'token' )}
    }).then(res => {
      res.data.success ? this.setState({friends: res.data.users,filter: res.data.users}) : null
    }).catch(err => {
      console.log( err );
    })
  }
  handleInputSearch(e){
    const val = e.target.value;
    const result = val.replace(/[^a-z\s]+/ig, '');
    const search = new RegExp( result, 'i' );
    this.setState({filter: this.state.friends.filter(user => search.test(user.name) === true )});
  }
  friendRemove(e){
    const id = e.target.getAttribute('data-id');
    this.setState({removeId: id , modal: true});
  }
  clickModalRemove(){
    this.props.removeFriend(this.state.removeId);
    this.getFriends();
    this.setState({removeId: ''});
    this.closeModalRemove();
  }
  closeModalRemove(){
    this.setState({modal: false});
  }

  render(){
    const { user, removeFriend } = this.props;
    const { modal, friends, filter  } = this.state;

    return ( <Friend
        modal={ modal } clickModalRemove={ this.clickModalRemove }
        friendRemove={ this.friendRemove } friends={ friends } filter={ filter }
        closeModalRemove={ this.closeModalRemove } handleInputSearch={ this.handleInputSearch }
      /> )
  }
}

export default Friends;