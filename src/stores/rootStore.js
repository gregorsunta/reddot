import AuthStore from './authStore';
import UserStore from './userStore';

class RootStore {
  constructor() {
    this.authStore = AuthStore;
    this.userStore = UserStore;
  }
}

export default new RootStore();
