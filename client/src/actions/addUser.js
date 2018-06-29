import { ADD_USER, EXIT_USER, SIGN_USER } from '../constants';

//2

export function addUserReducer( payload ) {
  return { type: ADD_USER, payload };
}

export function signInUserActions( payload ) {
  return { type: SIGN_USER, payload };
}

export function exitUserActions() {
  return { type: EXIT_USER };
}
