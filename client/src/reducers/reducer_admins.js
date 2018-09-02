import { FETCH_ADMIN_LOGIN } from '../actions/types';

export default (state = [], action) => {
  switch (action.type) {
    case FETCH_ADMIN_LOGIN:
      return action.admin_login;
    default:
      return state;
  }
};
