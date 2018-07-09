import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { Icon, Menu } from 'semantic-ui-react';

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
    const {configLang} = this.props;

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
            {configLang.account}
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
            {configLang.friend}
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
            {configLang.search}
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
            {configLang.news}
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
            {configLang.setting}
          </Menu.Item>
          <Link to='/setting' className='Link' />
        </div>
      </Menu>
    )
  }
}

export default UserControlMenu;
