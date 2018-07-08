export const CHANGE_LANG = 'CHANGE_LANG';
export const ADD_USER = 'ADD_USER';
export const EXIT_USER = 'EXIT_USER';
export const ADD_FRIEND = 'ADD_FRIEND';
export const REMOVE_FRIEND = 'REMOVE_FRIEND';
export const USERS_FROM_DB = 'http://localhost:3001/api/users';
export const HOST_URL = 'http://localhost:3000';

export const regExp = {
  email: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
  name: /^[a-zA-Z]{0,32}$/,
  age:  /^(100|[1-9]?[1-9])$/
};

export const lang = {
  gb: {
    header: {
      title: 'Header title',
      btnReg: 'Registration',
      btnExit: 'Exit',
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
      btnExit: 'Выход',
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
      btnExit: 'Вихід',
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
