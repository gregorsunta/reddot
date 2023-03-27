import AuthStore from './authStore';
import UserStore from './userStore';

class RootStore {
  constructor() {
    this.authStore = AuthStore;
    this.userStore = UserStore;
  }
}
const rootStore = new RootStore();
export default rootStore;
