import { makeObservable, observable, action } from 'mobx';
import { getAuth } from 'firebase/auth';

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
  };
  setUser = (user) => {
    this.user = user;
  };
}

export default new AuthStore();
