import React from 'react';
import LoginMenu from './LoginMenu';
import UserControlMenu from './UserControlMenu';


const AsideComponent = ({ auth, signUser, addUser, configLang, authHandler, clickAuthUser,
  errorLogin, errorPassword, passwordValid, loginValid, activeItem, handleItemClickItem }) =>{
  return  (
    <div className='Aside'>
      {auth ? <UserControlMenu configLang={ configLang } activeItem={ activeItem }
                               handleItemClickItem={ handleItemClickItem }/> :
        <LoginMenu configLang={ configLang } signUser={ signUser } addUser={ addUser }
                   authHandler={ authHandler } clickAuthUser={ clickAuthUser } loginValid={ loginValid }
                   errorLogin={ errorLogin } errorPassword={ errorPassword } passwordValid={ passwordValid }/>}
    </div>)
};

export default AsideComponent;