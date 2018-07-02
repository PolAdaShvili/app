import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import { routerMiddleware, routerReducer } from 'react-router-redux';
import thunkMiddleware from 'redux-thunk'
import history from './browserHistory';
import langReducers from './reducers/langReducers';
import UserReducer  from './reducers/UserReducers/UserReducer';


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  combineReducers({
    changeLang: langReducers,
    addUser: UserReducer,
    router: routerReducer
  }),
  composeEnhancers(applyMiddleware(
    routerMiddleware(history),
    thunkMiddleware
  ))
);

export default store;
