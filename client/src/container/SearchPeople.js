import React, { Component } from 'react';
import axios from 'axios';
import SearchPeopleComponent from '../components/Main/ContentRouts/SearchPeople/SearchPeople';

class SearchPeople extends Component {
  constructor(props){
    super(props);
    this.state = {
      users: []
    }

    this.handleAddFriends = this.handleAddFriends.bind(this);
    this.handleInputSearch = this.handleInputSearch.bind(this);
  }
  componentDidMount(){
    this.props.user ? this.setState({friends: this.props.user.friends}): null;
  }

  handleInputSearch(e){
    const token = localStorage.getItem( 'token' );
    const formData = new FormData();
    const val = e.target.value;
    const result = val.replace(/[^a-z\s]+/ig, '');

    this.setState({inputVal: result});

    if(val.length >= 1){
      formData.append('search', result);
      axios({
        method: 'post', url: '/api/user/search',
        headers: {'Content-Type': 'multipart/form-data', authorization: token },
        data: formData
      }).then(res => {
        this.setState({users: res.data});
      }).catch(err => {
        console.log( err );
      })
    }
  }
  handleAddFriends(e){
    const friendId = e.target.getAttribute('data-id');
    this.props.addFriend(friendId);
  }

  render(){
    const {addFriend, user, configLang} = this.props;
    const { users, friends, inputVal } = this.state;

    return (
      <SearchPeopleComponent
        inputVal={inputVal} users={users} friends={friends} configLang={configLang}
        handleAddFriends={ this.handleAddFriends } handleInputSearch={ this.handleInputSearch }
      />
    )
  }
}

export default SearchPeople;