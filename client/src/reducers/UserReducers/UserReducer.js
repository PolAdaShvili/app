import { ADD_USER, EXIT_USER, ADD_FRIEND, REMOVE_FRIEND } from '../../constants';


const initialState = {
  authorization: false,
  userInfo: {},
  friends: []
};

const addUserReducer = ( state = initialState, action ) => {
  switch (action.type) {
    case ADD_USER:
      return Object.assign({}, state, {
        authorization: true,
        userInfo: action.payload
      });
    case ADD_FRIEND:
      const { payload } = action.payload;
      state.userInfo.user.friends.push(payload)
      return Object.assign({}, state);
    case REMOVE_FRIEND:
      const test = state.userInfo.user.friends.filter(id => id !== action.payload);
      state.userInfo.user.friends = test;
      return Object.assign({}, state);
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