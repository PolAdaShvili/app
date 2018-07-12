import React from 'react';
import { Button, Form, Icon, Input, Label, Menu } from 'semantic-ui-react';


const LoginMenu = ({ signUser, addUser, configLang, clickAuthUser, authHandler,
  errorLogin, errorPassword, loginValid, passwordValid  }) => {
  return (
    <Form>
      <Menu vertical className='LoginMenu'>
      <Menu.Item name='sign' className='sign'>
        <Icon name='sign in'/> { configLang.sing }
      </Menu.Item>
      <Menu.Item>
        <Input name='login' onChange={ authHandler }
               placeholder={ configLang.placeHolderLogin }/>
        {errorLogin ? <Label basic color='red' pointing>
          { configLang.loginValid }
        </Label> : null}
      </Menu.Item>
      <Menu.Item>
        <Input name='password' type='password' onChange={ authHandler }
               placeholder={ configLang.placeHolderPassword }/>
        {errorPassword ? <Label basic color='red' pointing>
          { configLang.passwordValid}
        </Label> : null}
      </Menu.Item>
      <Menu.Item>
        <Button fluid primary content={configLang.sing} onClick={ clickAuthUser }/>
      </Menu.Item>
    </Menu>
    </Form>)
};

export default LoginMenu;
