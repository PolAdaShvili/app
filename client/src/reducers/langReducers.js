import { CHANGE_LANG } from '../constants';

const lang = {
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
    main: {
      form: {
        name: 'First Name',
        middle: 'Middle Name',
        surname: 'Last Name',
        email: 'Email',
        gender: {
          title: 'gender',
          male: 'Male',
          female: 'Female'
        },
        age: 'Age',
        file: 'Upload file',
        button: 'Create account'
      }
    },
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
    main: {
      form: {
        name: 'Имя',
        middle: 'Отчество',
        surname: 'Фамилия',
        email: 'Почта',
        gender: {
          title: 'Пол',
          male: 'Мужской',
          female: 'Женский'
        },
        age: 'Возраст',
        file: 'Загрузить фото',
        button: 'Создать аккаунт'
      }
    },
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
    main: {
      form: {
        name: 'Ім\'я',
        middle: 'Отчество',
        surname: 'Фамілія',
        email: 'Почта',
        gender: {
          title: 'Стать',
          male: 'Чоловічий',
          female: 'Жіночий'
        },
        age: 'Вік',
        file: 'Додати зображення',
        button: 'Стваорити аккаунт'
      }
    },
    footer: {
      title: 'Заголовк підвалу'
    }
  }
};
const initialState = {
  fixedLang: 'gb',
  translations: lang['gb']
};

function changeLangReducer ( state = initialState, action ) {
  switch (action.type) {
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
