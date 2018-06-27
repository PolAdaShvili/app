const PORT = 3001;
const URL_DB = 'mongodb://localhost:27017/app';
const URL_USERS = 'http://localhost:3001/api/users';
const secret = 'jwtSecret';

const regExp = {
  email: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
  name: /^[a-zA-Z]{0,32}$/,
  age:  /^(100|[1-9]?[1-9])$/
};

module.exports = {
  PORT,
  URL_DB,
  URL_USERS,
  regExp,
  secret
};
