import { makeAutoObservable } from 'mobx';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { contentStore } from './';

class AuthStore {
  user = null;
  isLoading = false;
  auth = null;
  constructor() {
    makeAutoObservable(this);
  }

  init = (app) => {
    this.auth = getAuth(app);
    onAuthStateChanged(this.auth, (user) => {
      let unsubscribe;
      if (!!user) {
        this.setUser(user);
        unsubscribe = contentStore.subscribeToUser(user.uid);
      } else {
        this.setUser(null);
        contentStore.resetUser();
        unsubscribe && unsubscribe();
      }
    });
  };

  setUser(user) {
    this.user = user;
  }

  get userId() {
    return this.user.uid;
  }
}

const authStore = new AuthStore();
export { authStore };
