import { ADD_USER, EXIT_USER, SIGN_USER } from '../../constants';


const initialState = {
  authorization: false,
  userInfo: {}
};

const addUserReducer = ( state = initialState, action ) => {
  switch (action.type) {
    case ADD_USER:
      return Object.assign({}, state, {
        authorization: true,
        userInfo: action.payload
      });
    case SIGN_USER:
      return Object.assign({}, state, {
        authorization: true,
        userInfo: action.payload
      });
    case EXIT_USER:
      return Object.assign({}, state, {
        authorization: false,
        userInfo: {}
      });
    default :
      return state;
  }
}

export default addUserReducer;