import React, { Component } from 'react';
import axios from "axios/index";
import AsideComponent from '../components/Main/Aside/Aside';


class Aside extends Component {
  constructor(props){
    super(props);

    this.state = {
      login: '', password: '',
      errorLogin: '', errorPassword: '', activeItem: ''
    };

    this.authHandler = this.authHandler.bind(this);
    this.clickAuthUser = this.clickAuthUser.bind(this);
    this.handleItemClickItem = this.handleItemClickItem.bind(this);
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
      err_login ? this.setState( {errorLogin: this.props.configLang.loginValid} ) : this.setState( {errorLogin: false} );
      err_password ? this.setState( {errorPassword: this.props.configLang.passwordValid} ) : this.setState( {errorPassword: err_password} );

      if(success) {
        localStorage.setItem('token', res.data.token );
        this.props.addUser(res.data.user);
      }
    })
  }
  handleItemClickItem(e, { name }){
    this.setState({ activeItem: name });
  }

  render(){
    const { auth, addUser, configLang } = this.props;
    const { errorLogin, errorPassword, activeItem } = this.state;

    return (
      <AsideComponent
        auth={ auth } signUser={ this.signUser } addUser={ addUser } configLang={ configLang }
        authHandler={ this.authHandler } clickAuthUser={ this.clickAuthUser } errorLogin={ errorLogin }
        errorPassword={ errorPassword } activeItem={ activeItem }
      />
    )
  }
}


export default Aside;
