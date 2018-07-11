import { ADD_USER, EXIT_USER, ADD_FRIEND, REMOVE_FRIEND, SET_NEWS } from '../../constants';


const initialState = {
  authorization: false,
  userInfo: {},
  friends: [],
  //posts: []
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
      const result = state.userInfo.user.friends.filter(id => id !== action.payload);
      state.userInfo.user.friends = result;
      return Object.assign({}, state);
    case EXIT_USER:
      return Object.assign({}, state, {
        authorization: false,
        userInfo: {}
      });
    case SET_NEWS:
      state.userInfo.posts = action.payload;
      return Object.assign({}, state)
    default :
      return state;
  }
}

export default addUserReducer;