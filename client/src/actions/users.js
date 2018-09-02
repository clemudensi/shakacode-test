import axios from 'axios';
import { FETCH_USER_LOGIN } from './types';

export const fetchLoginSuccess = user_login => ({
  type: FETCH_USER_LOGIN,
  user_login,
});

export default function fetchUsers() {
  axios.defaults.headers.common.Authorization = localStorage.getItem('id_token');
  return async (dispatch) => {
    try {
      const user = await axios.get('/api/v1/user/:id/dashboard');
      dispatch(fetchLoginSuccess(user.data));
    } catch (err) {
      if (err.response.status === 401 || 304) {
        window.location.replace('/');
      }
    }
  };
}
