import { ADD_USER, EXIT_USER } from '../constants';


export function addUserReducer(user) {
  return { type: ADD_USER, user };
}

export function exitUserReducer() {
  return { type: EXIT_USER };
}