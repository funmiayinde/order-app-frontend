import jwtDecode from 'jwt-decode';
import { store } from '../redux/store';

class AuthService {

  getUserSession() {
    const { getState } = store;
    const { auth } = getState();
    return auth.sessionToken;
  }

  isLoggedIn(): boolean {
    const token = this.getUserSession();
    if (token) {
      try {
        const decoded: any = jwtDecode<any>(token);
        const sessionTimeExp = decoded.exp;
        return sessionTimeExp > new Date().getTime() / 1000;
      } catch (e) {
        return false;
      }
    }
    return false;
  }
}

export default new AuthService();
