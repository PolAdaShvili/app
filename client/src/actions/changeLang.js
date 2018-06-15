import { CHANGE_LANG } from '../constants';


export function langReducer(lang) {
  return { type: CHANGE_LANG, lang };
}
