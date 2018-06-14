import React from 'react';
import Main from './MainContent'
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';


const Container = () => {
  return (
    <div className='App'>
      <Header />
      <Main />
      <Footer />
    </div>
  )
};

export default Container;
