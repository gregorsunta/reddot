import { makeObservable, observable, action, reaction, when } from 'mobx';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { addUser, getUser } from '../services/firestore/users';
import { userStore } from './';

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
      userExistsInDatabase: action,
      addUserToDatabase: action,
    });
  }

  init = (app) => {
    this.auth = getAuth(app);
    onAuthStateChanged(this.auth, (user) => {
      let unsubscribe;
      if (!!user) {
        this.setUser(user);
        unsubscribe = userStore.unsubscribeFromUser();
        this.checkUser(user);
      } else {
        this.setUser(null);
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

  async checkUser(user) {
    const userExists = await this.userExistsInDatabase(user);
    !userExists && this.addUserToDatabase(user);
  }

  async userExistsInDatabase(userObj) {
    const user = await getUser(userObj.uid);
    return !!user;
  }

  async addUserToDatabase(userObj) {
    await addUser(userObj);
  }
}

const authStore = new AuthStore();
export { authStore };
