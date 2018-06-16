import { CHANGE_LANG } from '../constans';


export function langReducer(lang) {
  return { type: CHANGE_LANG, lang };
}
