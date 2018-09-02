import { combineReducers } from 'redux';
import user_login from './reducer_users';
import admin_login from './reducer_admins';

export default combineReducers({
  user_login,
  admin_login,
});
