import { action, makeObservable, observable } from 'mobx';

export class UserStore {
  user = null;
  constructor(RootStore) {
    this.RootStore = RootStore;
    makeObservable(this, {
      user: observable,
      setUser: action,
    });
  }
  setUser = (user) => {
    this.user = user;
  };
}
export default new UserStore();
