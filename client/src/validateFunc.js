import { regExp } from './constants';


export const setValidClass = e => {
  e.target.classList.add('valid');
  e.target.classList.remove('err');
};
export const setErrValidClass = e => {
  e.target.classList.remove('valid');
  e.target.classList.add('err');
};
export const validate = (regExp,name,value) => {
  return regExp[name].test(value);
};
export const validateNames = (regExp,name,value) => {
  return (value.search(regExp.name) !== - 1);
};

export const validateEmail = {
  required: true,
  email: true
};
