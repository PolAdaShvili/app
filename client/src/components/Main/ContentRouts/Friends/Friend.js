import React, { Component } from 'react';
import FriendList from './FriensList';
import ModalRemoveFriend from './ModalRemoveFriend';
import SearchInput from '../SearchPeople/SearchInput';


const Friend = ({ modal, clickModalRemove, closeModalRemove, handleInputSearch, friends, friendRemove, filter }) => {
  return ( <div className='Friends'>
    { modal ? <ModalRemoveFriend open={ modal } remove={ clickModalRemove } close={ closeModalRemove }/> : null }
    <div className="SearchInputBlock">
      <SearchInput eventSearch={ handleInputSearch }/>
      { friends ? <FriendList friends={ filter } friendRemove={ friendRemove } /> : null }
    </div>
  </div> )
};

export default Friend;