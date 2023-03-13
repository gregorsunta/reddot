import authStore from './authStore';
import dataStore from './userStore';

class RootStore {
  constructor(app) {
    this.DataStore = dataStore();
    this.AuthStore = authStore(app);
  }
}
export default new RootStore();
