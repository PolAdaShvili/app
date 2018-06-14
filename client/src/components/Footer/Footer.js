import React from 'react';
import { Divider } from 'semantic-ui-react'


const Footer = ({ configLang }) => {
  return (
    <div className='Footer'>
      <Divider horizontal inverted>
        { configLang.title }
      </Divider>
    </div>
  )
};

export default Footer;
