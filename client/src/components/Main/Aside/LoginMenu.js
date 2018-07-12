import React from 'react';
import { Button, Form, Icon, Input, Label, Menu } from 'semantic-ui-react';

const LoginMenu = ({ signUser, addUser, configLang, clickAuthUser, authHandler,
  errorLogin, errorPassword, loginValid, passwordValid  }) => {

  return (
    <Form>
    <Menu
    vertical
    className='LoginMenu'>
    <Menu.Item name='sign' className='sign'>
      <Icon name='sign in'/>
      { configLang.sing }
    </Menu.Item>
      <Menu.Item>
        <Input
          name='login'
          placeholder={ configLang.placeHolderLogin }
          onChange={ authHandler }
        />
        { errorLogin ? <Label basic color='red' pointing>
          { configLang.loginValid }
        </Label> : null }
      </Menu.Item>
      <Menu.Item>
        <Input
          name='password'
          type='password'
          autoComplete='off'
          placeholder={ configLang.placeHolderPassword }
          onChange={ authHandler }
        />
        { errorPassword ? <Label basic color='red' pointing>
          { configLang.passwordValid }
        </Label> : null}
      </Menu.Item>
      <Menu.Item>
        <Button
          fluid
          primary
          content={configLang.sing}
          color='teal'
          onClick={ clickAuthUser }
        />
      </Menu.Item>
  </Menu>
    </Form>)
};

export default LoginMenu;
