import React from 'react';
import LoginMenu from './LoginMenu';
import UserControlMenu from './UserControlMenu';

const Aside = ( {auth, signUser, addUser, configLang} ) =>{
  return  ( <div className='Aside'>
    {auth ? <UserControlMenu configLang={configLang}/> :
      <LoginMenu configLang={configLang} signUser={signUser} addUser={addUser}/>}
  </div>)
}

export default Aside;