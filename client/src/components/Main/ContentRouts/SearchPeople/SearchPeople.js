import React, { Component } from 'react';
import { Button } from 'semantic-ui-react';
import SearchInput from './SearchInput';
import UserList from './UserList';


const SearchPeopleComponent = ({ handleInputSearch, users, friends, inputVal, handleAddFriends }) => {
  return ( <div className='SearchPeople'>
    <div className="SearchInputBlock">
      <SearchInput eventSearch={ handleInputSearch }/>
      {
        users && friends && inputVal ? <UserList
          users={ users }
          friends={ friends }
          addFriend={ handleAddFriends }/> : null
      }
    </div>
  </div> )
};

export default SearchPeopleComponent;