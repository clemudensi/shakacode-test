/* eslint-disable camelcase */
import axios from 'axios';
import { FETCH_ADMIN_LOGIN } from './types';

export const fetchLoginSuccess = admin_login => ({
  type: FETCH_ADMIN_LOGIN,
  admin_login,
});

export default function fetchAdmins() {
  axios.defaults.headers.common.Authorization = localStorage.getItem('id_token');
  return async (dispatch) => {
    try {
      const admin = await axios.get('/api/v1/admin/:id/dashboard');
      dispatch(fetchLoginSuccess(admin.data));
    } catch (err) {
      if (err.response.status === 401 || 304) {
        window.location.replace('/');
      }
    }
  };
}
