import { ADD_USER, EXIT_USER, ADD_FRIEND, REMOVE_FRIEND, SET_NEWS } from '../constants';


export function addUserReducer( payload ) {
  return { type: ADD_USER, payload };
}

export function addFriendActions( payload ) {
  return { type: ADD_FRIEND, payload };
}

export function removeFriendAction( {payload} ) {
  return { type: REMOVE_FRIEND, payload };
}

export function setNewsAction( {payload} ) {
  return { type: SET_NEWS, payload };
}

export function exitUserActions() {
  return { type: EXIT_USER };
}
