import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { Menu, Icon } from 'semantic-ui-react';
import axios from "axios/index";


class UserControlMenu extends Component{
  constructor(props){
    super(props);

    this.state = {
      activeItem: ''
    };

    this.handleItemClickItem = this.handleItemClickItem.bind(this);
  }

  handleItemClickItem(e, { name }){
    this.setState({ activeItem: name });
  }

  render(){
    const { activeItem } = this.state;

    return (
      <Menu
        vertical
        fluid={true}
        className='userControlMenu'
      >
        <div className='account LinkMenu'>
          <Menu.Item
            name='account'
            active={activeItem === 'account'}
            onClick={this.handleItemClickItem}
          >
            <Icon name='user' />
            My account
          </Menu.Item>
          <Link to='/account' className='Link' />
        </div>
        <div className='friends LinkMenu'>
          <Menu.Item
            name='friends'
            active={activeItem === 'friends'}
            onClick={this.handleItemClickItem}
          >
            <Icon name='group' />
            Friends
          </Menu.Item>
          <Link to='/friends' className='Link' />
        </div>
        <div className='people LinkMenu'>
          <Menu.Item
            name='people'
            active={activeItem === 'people'}
            onClick={this.handleItemClickItem}
          >
            <Icon name='search' />
            Search people
          </Menu.Item>
          <Link to='/people' className='Link' />
        </div>
        <div className='news LinkMenu'>
          <Menu.Item
            name='news'
            active={activeItem === 'news'}
            onClick={this.handleItemClickItem}
          >
            <Icon name='file alternate'/>
            News feed
          </Menu.Item>
          <Link to='/news' className='Link' />
        </div>
        <div className='setting LinkMenu'>
          <Menu.Item
            name='setting'
            active={activeItem === 'setting'}
            onClick={this.handleItemClickItem}
          >
            <Icon name='settings'/>
            Settings
          </Menu.Item>
          <Link to='/setting' className='Link' />
        </div>
      </Menu>
    )
  }
}

export default UserControlMenu;
