import React from 'react';
import FriendList from './FriensList';
import ModalRemoveFriend from './ModalRemoveFriend';
import SearchInput from '../SearchPeople/SearchInput';

const FriendsComponent = ( {
  modal, clickModalRemove, closeModalRemove, handleInputSearch, friends, friendRemove, filter, configLang
} ) =>{
  return ( <div className='Friends'>
    {modal ? <ModalRemoveFriend configLang={configLang} open={modal} remove={clickModalRemove}
                                close={closeModalRemove}/> : null}
    <div className="SearchInputBlock">
      <SearchInput eventSearch={handleInputSearch} configLang={configLang}/>
      {friends ? <FriendList friends={filter} friendRemove={friendRemove} configLang={configLang}/> : null}
    </div>
  </div> )
};
export default FriendsComponent;
