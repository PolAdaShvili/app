import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import thunkMiddleware from 'redux-thunk'
import history from './browserHistory';
import langReducers from './reducers/langReducers';


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  combineReducers({
    changeLang: langReducers
  }),
  composeEnhancers(applyMiddleware(
    routerMiddleware(history),
    thunkMiddleware
  ))
);

export default store;
