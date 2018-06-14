import React from 'react';
import { Route, Switch } from "react-router";
import Form from '../components/Main/Form/Form';


const MainContent = ({ configLang }) => {
  return (
    <div className='MainContent'>
      <div>
        <Switch>
          <Route
            exact
            path="/registration"
            render={ () => <Form configLang={ configLang.form } />} />
        </Switch>
      </div>
    </div>
  )
};

export default MainContent;
