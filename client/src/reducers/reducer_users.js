import { FETCH_USER_LOGIN } from '../actions/types';

export default (state = [], action) => {
  switch (action.type) {
    case FETCH_USER_LOGIN:
      return action.user_login;
    default:
      return state;
  }
};
