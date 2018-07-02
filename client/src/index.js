import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Route} from "react-router";
import { ConnectedRouter } from "react-router-redux";
import store from './store';
import history from './browserHistory';
import Container from './container/Container';
import 'semantic-ui-css/semantic.min.css';
import './styles/styles.scss';


ReactDOM.render(
  <Provider store={ store }>
    <ConnectedRouter history={ history }>
      <div className='App'>
        <Route path="/" component={ Container }/>
      </div>
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root')
);
