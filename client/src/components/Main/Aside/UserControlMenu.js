import React from 'react';
import { Link } from "react-router-dom";
import { Icon, Menu } from 'semantic-ui-react';

const UserControlMenu = ({ activeItem, configLang, handleItemClickItem }) => {
  return ( <Menu
    vertical
    fluid={true}
    className='userControlMenu'
  >
    <div className='account LinkMenu'>
      <Menu.Item
        name='account'
        active={ activeItem === 'account' }
        onClick={ handleItemClickItem }
      >
        <Icon name='user' />
        { configLang.account }
      </Menu.Item>
      <Link to='/account' className='Link' />
    </div>
    <div className='friends LinkMenu'>
      <Menu.Item
        name='friends'
        active={ activeItem === 'friends' }
        onClick={ handleItemClickItem }
      >
        <Icon name='group' />
        { configLang.friend }
      </Menu.Item>
      <Link to='/friends' className='Link' />
    </div>
    <div className='people LinkMenu'>
      <Menu.Item
        name='people'
        active={ activeItem === 'people' }
        onClick={ handleItemClickItem }
      >
        <Icon name='search' />
        { configLang.search }
      </Menu.Item>
      <Link to='/people' className='Link' />
    </div>
    <div className='news LinkMenu'>
      <Menu.Item
        name='news'
        active={ activeItem === 'news' }
        onClick={ handleItemClickItem }
      >
        <Icon name='file alternate'/>
        { configLang.news }
      </Menu.Item>
      <Link to='/news' className='Link' />
    </div>
    <div className='setting LinkMenu'>
      <Menu.Item
        name='setting'
        active={ activeItem === 'setting' }
        onClick={ handleItemClickItem }
      >
        <Icon name='settings'/>
        { configLang.setting }
      </Menu.Item>
      <Link to='/setting' className='Link' />
    </div>
  </Menu> )
}

export default UserControlMenu;
