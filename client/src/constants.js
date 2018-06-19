export const CHANGE_LANG = 'CHANGE_LANG';
export const USERS_FROM_DB = 'http://localhost:3001/api/users';
export const ADD_USER = 'ADD_USER';
export const regExp = {
  email: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
  name: /^[a-zA-Z]{0,32}$/,
  age:  /^(100|[1-9]?[1-9])$/
};
