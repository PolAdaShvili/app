import React, { Component } from 'react';
import LoginMenu from './LoginMenu';
import UserControlMenu from './UserControlMenu';


class Aside extends Component{

  render(){
    const { auth } = this.props;
    console.log('--->', auth );
    return (
      <div className='Aside'>
        { auth.authorization ? <UserControlMenu /> : <LoginMenu /> }
      </div>

    )
  }
}

export default Aside;