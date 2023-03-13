import authStore from './authStore';
import dataStore from './dataStore';

class RootStore {
  constructot() {
    this.DataStore = authStore();
    this.AuthStore = dataStore();
  }
}
