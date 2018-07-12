import React from 'react';
import SearchInput from './SearchInput';
import UserList from './UserList';

const SearchPeopleComponent = ( {handleInputSearch, users, friends, inputVal, handleAddFriends, configLang} ) =>{
  return ( <div className='SearchPeople'>
    <div className="SearchInputBlock">
      <SearchInput eventSearch={handleInputSearch} configLang={configLang}/>
      {users && friends && inputVal ? <UserList
        users={ users }
        friends={ friends }
        addFriend={handleAddFriends}
        configLang={configLang}
      /> : null}
    </div>
  </div> )
};

export default SearchPeopleComponent;