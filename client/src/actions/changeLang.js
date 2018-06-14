import { CHANGE_LANG } from '../constans';


export function langReducer(payload) {
  return { type: CHANGE_LANG, payload };
}
