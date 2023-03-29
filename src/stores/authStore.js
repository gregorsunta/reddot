import { makeObservable, observable, action } from 'mobx';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

class AuthStore {
  user = null;
  isLoading = false;
  auth = null;
  constructor() {
    makeObservable(this, {
      user: observable,
      isLoading: observable,
      auth: observable,
      init: action,
      setUser: action,
    });
  }
  init = (app) => {
    this.auth = getAuth(app);
    onAuthStateChanged(this.auth, (user) => {
      this.setUser(user ? user : null);
    });
  };
  setUser = (user) => {
    this.user = user;
  };
}
const authStore = new AuthStore();
export default authStore;
