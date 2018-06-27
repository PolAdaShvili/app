import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import { routerMiddleware, routerReducer } from 'react-router-redux';
import thunkMiddleware from 'redux-thunk'
import history from './browserHistory';
import langReducers from './reducers/langReducers';
import addUserReducer  from './reducers/UserReducers/addUserReducer';


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  combineReducers({
    changeLang: langReducers,
    addUser: addUserReducer,
    router: routerReducer
  }),
  composeEnhancers(applyMiddleware(
    routerMiddleware(history),
    thunkMiddleware
  ))
);

export default store;
