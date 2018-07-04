import { ADD_USER, EXIT_USER, ADD_FRIEND } from '../constants';


export function addUserReducer( payload ) {
  return { type: ADD_USER, payload };
}

export function addFriendActions( payload ) {
  return { type: ADD_FRIEND, payload };
}

export function exitUserActions() {
  return { type: EXIT_USER };
}
