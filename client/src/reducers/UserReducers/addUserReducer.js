import { ADD_USER } from '../../constants';


const initialState = {
  authorization: false,
  userInfo: {}
};

function addUserReducer ( state = initialState, action ) {
  switch (action.type) {
    case ADD_USER:
      return Object.assign({}, state, {
        authorization: action.user.authorization,
        userInfo: action.user
      });
    default :
      return state;
  }
}

export default addUserReducer;