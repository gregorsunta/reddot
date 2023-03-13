import { makeObservable, observable, action } from 'mobx';
import { getAuth } from 'firebase/auth';

class AuthStore {
  user = null;
  isLoading = false;
  constructor(app) {
    this.auth = getAuth(app);
    makeObservable(this, {
      user: observable,
      isLoading: observable,
      auth: observable,
      setUser: action,
    });
  }
  setUser = (user) => {
    this.user = user;
  };
}

const createAuthStore = (auth) => {
  let authStoreInstance = null;
  if (!authStoreInstance) {
    authStoreInstance = new AuthStore(auth);
  }
  return authStoreInstance;
};

export default createAuthStore;
