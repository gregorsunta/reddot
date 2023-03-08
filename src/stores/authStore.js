import { makeObservable, observable, action } from 'mobx';

export default class authStore {
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
