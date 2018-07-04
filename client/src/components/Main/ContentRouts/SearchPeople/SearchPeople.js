import React, { Component } from 'react';
import axios from 'axios';
import { Button } from 'semantic-ui-react';
import SearchInput from './SearchInput';
import UserList from './UserList';


class SearchPeople extends Component {
  constructor(props){
    super(props);
    this.state = {
      users: []
    }

    this.handleAddFriends = this.handleAddFriends.bind(this);
    this.handleInputSearch = this.handleInputSearch.bind(this);
  }


  handleInputSearch(e){
    const token = localStorage.getItem( 'token' );
    const formData = new FormData();
    const val = e.target.value;
    formData.append('search', val);
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
  handleAddFriends(e){
    const friendId = e.target.getAttribute('data-id');
    this.props.addFriend(friendId);
  }

  render(){
    const { addFriend } = this.props;
    const users = this.state.users;

    return ( <div className='SearchPeople'>
        <div className="SearchInputBlock">
          <SearchInput eventSearch={ this.handleInputSearch }/>
          {
            users ? <UserList users={ users } addFriend={ this.handleAddFriends }  /> : null
          }
        </div>
      </div>
    )
  }
}

export default SearchPeople;