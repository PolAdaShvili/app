import React, { Component } from 'react';
import LoginMenu from './LoginMenu';
import UserControlMenu from './UserControlMenu';


const Aside = ({ auth, signUser, addUser }) => {
  return  ( <div className='Aside'>
    { auth ? <UserControlMenu /> : <LoginMenu signUser={ signUser } addUser={ addUser } /> }
  </div>)
}

export default Aside;