import React, { Component } from 'react';
import { Input, Menu, Button } from 'semantic-ui-react'

class Aside extends Component{

  render(){
    const { auth } = this.props;
    console.log('--ASIDE-props--->',this.props);
    console.log('--ASIDE-auth--->',auth);

    return (
      <div>
        <h1>Aside</h1>
        <Menu vertical>
          <Menu.Item name='sing'>
            Sing in
          </Menu.Item>
          <Menu.Item>
            <Input placeholder='Enter email' />
          </Menu.Item>
          <Menu.Item>
            <Input placeholder='enter password' />
          </Menu.Item>
          <Menu.Item>
            <Button>
              Sing in
            </Button>
          </Menu.Item>
        </Menu>
      </div>

    )
  }
}

export default Aside;