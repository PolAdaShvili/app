import { ADD_USER, EXIT_USER } from '../../constants';


const initialState = {
  authorization: false,
  userInfo: {a:1}
};

function addUserReducer ( state = initialState, action ) {
  switch (action.type) {
    case ADD_USER :
      debugger;
      return Object.assign({}, state, {
        authorization: action.user.authorization,
        user: action.user.userInfo
      });
    case EXIT_USER :
      return Object.assign({}, state, {
        authorization: false,
        user: {}
      });
    default :
      return state;
  }
}

export default addUserReducer;