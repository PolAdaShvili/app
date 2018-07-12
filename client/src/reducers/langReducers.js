import { CHANGE_LANG, lang } from '../constants';



const initialState = {
  fixedLang: 'gb',
  translations: lang['gb']
};

function changeLangReducer ( state = initialState, action ) {
  switch ( action.type ) {
    case CHANGE_LANG:
      return Object.assign({}, state, {
        fixedLang: action.lang.fixedLang,
        translations: lang[action.lang.fixedLang]
      });
    default :
      return state;
  }
}

export default changeLangReducer;
