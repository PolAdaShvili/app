export const CHANGE_LANG = 'CHANGE_LANG';
export const ADD_USER = 'ADD_USER';
export const EXIT_USER = 'EXIT_USER';
export const ADD_FRIEND = 'ADD_FRIEND';
export const REMOVE_FRIEND = 'REMOVE_FRIEND';
export const SET_NEWS = 'SET_NEWS';
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
      btnHome: 'Home',
      langParams: {
        select: 'Select language',
        gb: 'English',
        ua: 'Ukrainian',
        ru: 'Russian'
      }
    },
    aside:  {
      account: 'Account',
      friend: 'Friends',
      search: 'Search people',
      news: 'News',
      setting: 'Setting',
      sing: 'Sing in',
      loginValid: 'Authentication failed. User not found.',
      passwordValid: 'Authentication failed. Wrong password.',
      placeHolderLogin: 'Enter login...',
      placeHolderPassword: 'Enter password...'
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
      }, account: {
        email: 'Email',
        first: 'First name',
        surname: 'Surname',
        middle: 'Middle name',
        gender: 'Gender',
        age: 'Age',
        save: 'Save',
        nameErr: 'Not valid name',
        emailBusy: 'Email is busy!'
      }, friends: {
        placeHolderSearch: 'Search...',
        view: 'View',
        remove: 'Remove friend',
        deleteModalTitle: 'Delete friend',
        deleteModalBody: 'Do you want to delete a friend ?',
        no: 'No!', yes: 'Yes!', age: 'Age', male: 'Male', female: 'Female'
      }, search: {
        placeHolderSearch: 'Search...',
        addFriend: 'Add friend',
        friend: 'You friend',
        male: 'Male',
        female: 'Female',
        age: 'Age',
        view: 'View'
      }, news: {
        placeHolderPost: 'New Post...',
        btnAddPost: 'Add post',
        btnAddPhoto: 'Add photo',
        btnSendPost: 'Send post',
        btnClosePost: 'Close'
      }, viewUser: {
        btnBack: 'Back',
        email: 'Email',
        first: 'First name',
        surname: 'Surname',
        middle: 'Middle name',
        gender: 'Gender',
        age: 'Age'
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
      btnHome: 'Домой',
      langParams: {
        select: 'Поменять язык',
        gb: 'Английский',
        ua: 'Украинский',
        ru: 'Русский'
      }
    }, aside: {
      account: 'Аккаунт',
      friend: 'Друзья',
      search: 'Поиск',
      news: 'Новости',
      setting: 'Настройки',
      sing: 'Вход',
      loginValid: 'Ошибка аутентификации. Пользователь не найден.',
      passwordValid: 'Ошибка аутентификации. Неправильный пароль.',
      placeHolderLogin: 'Введите логин...',
      placeHolderPassword: 'Введите пароль...'
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
      }, account: {
        email: 'Почта',
        first: 'Имя',
        surname: 'Фамилия',
        middle: 'Отчество',
        gender: 'Пол',
        age: 'Возраст',
        save: 'Сохранить',
        nameErr: 'Имя не валидно',
        emailBusy: 'Почтовый адресс занят'
      }, friends: {
        placeHolderSearch: 'Поиск...',
        view: 'Просмотр',
        remove: 'Удалить друга',
        deleteModalTitle: 'Удаление друга',
        deleteModalBody: 'Вы точно хотите удалить друга?',
        no: 'Нет!', yes: 'Да!', age: 'Возраст', male: 'Мужской', female: 'Женский'
      }, search: {
        placeHolderSearch: 'Поиск...',
        addFriend: 'Добавить друга',
        friend: 'Вы друзья',
        male: 'Мужской',
        female: 'Женский',
        age: 'Возраст',
        view: 'Просмотр'
      }, news: {
        placeHolderPost: 'Новый пост...',
        btnAddPost: 'Добавить пост',
        btnAddPhoto: 'Добавить фотографию',
        btnSendPost: 'Отравить пост',
        btnClosePost: 'Закрыть'
      }, viewUser: {
        btnBack: 'Назад',
        email: 'Почта',
        first: 'Имя',
        surname: 'Фамилия',
        middle: 'Отчество',
        gender: 'Пол',
        age: 'Возраст'
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
      btnHome: 'Додому',
      langParams: {
        select: 'Змінити мову',
        gb: 'Англійська',
        ua: 'Український',
        ru: 'Російський'
      }
    }, aside: {
      account: 'Аккаунт',
      friend: 'Друзі',
      search: 'Пошук',
      news: 'Новини',
      setting: 'Налаштування',
      sing: 'Вхід',
      loginValid: 'Автентифікація не виконана. Користувач не знайдений.',
      passwordValid: 'Автентифікація не виконана. Неправильний пароль.',
      placeHolderLogin: 'Введіть логін...',
      placeHolderPassword: 'Введіть пароль...'
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
      }, account: {
        email: 'Пошта',
        first: 'Ім\'я',
        surname: 'Прізвище',
        middle: 'Побатькове',
        gender: 'Стать',
        age: 'Вік',
        save: 'Зберигти',
        nameErr: 'Авторизація не пройшла',
        emailBusy: 'Електронна пошта зайнята!'
      }, friends: {
        placeHolderSearch: 'Пошук...',
        view: 'Перегляд',
        remove: 'Видалення друга',
        deleteModalTitle: 'Видалити друга',
        deleteModalBody: 'Ви точно бажаєте видалити друга?',
        no: 'Ні!', yes: 'Так!', age: 'Вік', male: 'Чоловік', female: 'Жінка'
      }, search: {
        placeHolderSearch: 'Пошук...',
        addFriend: 'Додати друга',
        friend: 'Вы друзi',
        male: 'Чоловік',
        female: 'Жінка',
        age: 'Вік',
        view: 'Перегляд'
      }, news: {
        placeHolderPost: 'Нове повідомлення...',
        btnAddPost: 'Додати новину',
        btnAddPhoto: 'Додати фотографію',
        btnSendPost: 'Відправити повідомлення',
        btnClosePost: 'Закрити'
      }, viewUser: {
        btnBack: 'Назад',
        email: 'Пошта',
        first: 'Ім\'я',
        surname: 'Прізвище',
        middle: 'Побатькове',
        gender: 'Стать',
        age: 'Вік'
      }
    },
    footer: {
      title: 'Заголовк підвалу'
    }
  }
};
