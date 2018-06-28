import React, { Component } from 'react';
import LoginMenu from './LoginMenu';
import UserControlMenu from './UserControlMenu';


class Aside extends Component{

  render(){
    const { auth } = this.props;

    return (
      <div className='Aside'>
        { auth ? <UserControlMenu /> : <LoginMenu /> }
      </div>

    )
  }
}

export default Aside;