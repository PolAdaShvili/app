import { regExp } from './constants';


export const addClassValid = e => {
  e.target.classList.add('valid');
  e.target.classList.remove('err');
};
export const addClassErr = e => {
  e.target.classList.remove('valid');
  e.target.classList.add('err');
};
export const validate = (regExp,name,value) => {
  return regExp[name].test(value);
};
export const validateName = (regExp,name,value) => {
  return (value.search(regExp.name) !== - 1);
};
