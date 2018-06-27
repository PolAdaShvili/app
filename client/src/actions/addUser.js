import { ADD_USER } from '../constants';


export function addUserReducer(user) {
  return { type: ADD_USER, user };
}