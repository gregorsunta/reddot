import { makeObservable, observable, action } from 'mobx';

class AuthStore {
  user = null;
  isLoading = false;
  constructor(auth) {
    this.auth = auth;
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
export default new AuthStore();
