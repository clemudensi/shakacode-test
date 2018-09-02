import decode from 'jwt-decode';
import axios from "axios";
export default class LocalAuthService {

    login = async (email, password)  => {
        const res = await axios.post('/api/v1/login', {
            email, password });
        localStorage.setItem('id_token', res.headers['x-auth-token']);
        return Promise.resolve(res);
    };

    async signup(firstName, lastName, email, password, terms_condition){
        const res = await axios.post('/api/v1/signup',{
            firstName, lastName, email, password, terms_condition
        });
        localStorage.setItem('id_token', res.headers['x-auth-token']);
        return Promise.resolve(res);
    }

  async admin(firstName, lastName, email, password, adminCode){
    const res = await axios.post('/api/v1/admin/signup',{
      firstName, lastName, email, password, adminCode
    });
    localStorage.setItem('id_token', res.headers['x-auth-token']);
    return Promise.resolve(res);
  }

    loggedIn() {
        const token = localStorage.getItem('id_token');
        return !!token && !this.isTokenExpired(token)
    }

    isTokenExpired(token) {
      try {
        const decoded = decode(localStorage.getItem('id_token'));
        if (decoded.exp > (Date.now() / 1000)) {
          return true;
        }
        else
          return false;
    }
    catch (err) {
      return false;
    }
  }

    getToken() {
        return localStorage.getItem('id_token')
    }

    logout() {
        return localStorage.removeItem('id_token');
    }
}
