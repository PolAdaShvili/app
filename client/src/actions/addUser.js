import { ADD_USER, EXIT_USER, ADD_FRIEND, REMOVE_FRIEND,
  SET_NEWS, DELETE_POST } from '../constants';


export function addUserReducer( payload ) {
  return { type: ADD_USER, payload };
}

export function addFriendActions( payload ) {
  return { type: ADD_FRIEND, payload };
}

export function removeFriendAction( {payload} ) {
  return { type: REMOVE_FRIEND, payload };
}

export function setPostAction( payload ) {
  return { type: SET_NEWS, payload };
}

export function exitUserActions() {
  return { type: EXIT_USER };
}
