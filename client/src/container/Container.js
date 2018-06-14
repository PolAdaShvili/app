import React, { Component } from 'react';
import axios from 'axios';
import Main from './MainContent'
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';


class Container extends Component{
  componentDidMount(){
    axios.get('http://localhost:3001/api/users')
      .then((res) => {
        console.log('USERS-->', res.data);
      })
      .catch((err) => {
        console.log('Connection error. -> USERS', err);
      });
  }

  render(){
    return (
      <div className='App'>
        <Header />
        <Main />
        <Footer />
      </div>
    )
  }
}

export default Container;
