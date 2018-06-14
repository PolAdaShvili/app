import { CHANGE_LANG } from '../constans';


const initialState = {
  authorizationUser: false,
  fixedLang: 'gb',
  lang: {
    gb: {
      header: {
        title: 'Header title',
        btnReg: 'Registration',
        langParams: {
          select: 'Select language',
          gb: 'English',
          ua: 'Ukrainian',
          ru: 'Russian'
        }
      },
      main: {},
      footer: {
        title: 'Footer title'
      }
    },
    ru: {
      header: {
        title: 'Заголовок шапки',
        btnReg: 'Регистрация',
        langParams: {
          select: 'Поменять язык',
          gb: 'Английский',
          ua: 'Украинский',
          ru: 'Русский'
        }
      },
      main: {},
      footer: {
        title: 'Заголовк подвала'
      }
    },
    ua: {
      header: {
        title: 'Заголовок шапки',
        btnReg: 'Реєстрація',
        langParams: {
          select: 'Змінити мову',
          gb: 'Англійська',
          ua: 'Український',
          ru: 'Російський'
        }
      },
      main: {},
      footer: {
        title: 'Заголовк підвалу'
      }
    }
  },
  users: []
};

function changeLangReducer ( state = initialState, action ) {
  switch (action.type) {
    case CHANGE_LANG:
      return Object.assign({}, state, {
        fixedLang: action.payload.fixedLang
      });
    default :
      return state;
  }
}

export default changeLangReducer;
