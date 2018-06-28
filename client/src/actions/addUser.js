import { ADD_USER, EXIT_USER } from '../constants';

//2

export function addUserReducer(payload) {
  return { type: ADD_USER, payload };
}

export function exitUserActions() {
  return { type: EXIT_USER };
}