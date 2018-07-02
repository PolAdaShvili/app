import React, { Component } from 'react';
import LoginMenu from './LoginMenu';
import UserControlMenu from './UserControlMenu';


class Aside extends Component{

  render(){
    const { auth, signUser, addUser } = this.props;

    return (

      <div className='Aside'>
        { auth ? <UserControlMenu /> : <LoginMenu signUser={ signUser } addUser={ addUser } /> }
      </div>

    )
  }
}

export default Aside;