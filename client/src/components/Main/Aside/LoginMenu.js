import axios from 'axios';
import React, { Component } from 'react';
import { Input, Button, Menu, Icon, Label } from 'semantic-ui-react';


class LoginMenu extends Component{
  constructor(props){
    super(props);

    this.state = {
      login: '',
      password: '',
      errorLogin: '',
      errorPassword: ''
    };

    this.authHandler = this.authHandler.bind(this);
    this.clickAuthUser = this.clickAuthUser.bind(this);
  }

  authHandler(e){
    const { name, value } = e.target;
    this.setState({[name]: value});
  }
  clickAuthUser(){
    axios({
      method: 'post',
      url: '/api/user/login',
      data: {
        login: this.state.login,
        psw: this.state.password
      }
    })
    .then(res => {
      const { success, err_login, err_password, token } = res.data;

      err_login ? this.setState({errorLogin:err_login}) : this.setState({errorLogin:false});
      err_password ? this.setState({errorPassword:err_password}) : this.setState({errorPassword:err_password});

      if(success) {

        localStorage.setItem('token', res.data.token );
        console.log( 'RES.DATA----->',res.data );
        this.props.addUser(res.data.user);
      }
    })
  }

  render(){
    const { signUser, addUser } = this.props;

    return (
      <Menu
        vertical
        className='LoginMenu'
      >
        <Menu.Item name='sign' className='sign'>
          <Icon name='sign in'/>
          Sign in
        </Menu.Item>
        <Menu.Item>
          <Input
            name='login'
            placeholder='Enter email'
            onChange={this.authHandler}
          />
          {this.state.errorLogin ? <Label basic color='red' pointing>
              {this.state.errorLogin}
          </Label> : null}
        </Menu.Item>
        <Menu.Item>
          <Input
            name='password'
            placeholder='enter password'
            onChange={this.authHandler}
          />
          {this.state.errorPassword ? <Label basic color='red' pointing>
            {this.state.errorPassword}
          </Label> : null}
        </Menu.Item>
        <Menu.Item>
          <Button
            fluid
            content='Sign in'
            onClick={this.clickAuthUser}
          />
        </Menu.Item>
      </Menu>
    )
  }
}

export default LoginMenu;
