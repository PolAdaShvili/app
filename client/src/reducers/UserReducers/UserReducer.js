import { ADD_USER, EXIT_USER } from '../../constants';


const initialState = {
  authorization: false,
  userInfo: {}
};

const addUserReducer = ( state = initialState, action ) => {
  switch (action.type) {
    case ADD_USER:
      return Object.assign({}, state, {
        authorization: action.payload.authorization,
        userInfo: action.payload.userInfo
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