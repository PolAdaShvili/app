import React, { Component } from 'react';
import axios from 'axios';
import SearchInput from './SearchInput';
import UserList from './UserList';


class SearchPeople extends Component {
  constructor(props){
    super(props);
    this.state = {
      users: []
    }

    this.handleInputSearch = this.handleInputSearch.bind(this);
  }

  handleInputSearch(e){
    const token = localStorage.getItem( 'token' );
    const formData = new FormData();
    const val = e.target.value;
    if ( val.length >= 1){
      formData.append('search', val);
      axios({
        method: 'post', url: '/api/user/search',
        headers: {'Content-Type': 'multipart/form-data', authorization: token },
        data: formData
      }).then(res => {
        this.setState({users: res.data});
        console.log( 'RES.DATA',res.data );
      }).catch(err => {
        console.log( err );
      })
    }
  }

  render(){
    const users = this.state.users;

    return ( <div className='SearchPeople'>
        <div className="SearchInputBlock">
          <SearchInput eventSearch={ this.handleInputSearch }/>
          <UserList users={ users } />
        </div>
      </div>
    )
  }
}

export default SearchPeople;