import React, { Component } from 'react';
import { Input, Menu, Button } from 'semantic-ui-react'

class Aside extends Component{

  render(){
    console.log('ASIDE--->',this.props.userInfo.user);
    return (
      <div>
        <h1>Aside</h1>
        {this.props.authorization ? <div><p>{this.props.userInfo.user.name  }</p></div> : <Menu vertical>
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
        </Menu>}
      </div>

    )
  }
}

export default Aside;