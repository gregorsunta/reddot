import { makeObservable, observable, action, reaction, when } from 'mobx';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { addUser, getUser } from '../services/firestore/users';

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
      this.setUser(user ? user : null);
      !this.userExistsInDatabase(user) && this.addUserToDatabase();
    });
  };

  setUser = (user) => {
    this.user = user;
  };

  userExistsInDatabase = async (userObj) => {
    const user = await getUser(userObj.uid);
    return !!user;
  };

  addUserToDatabase = async (userObj) => {
    await addUser(userObj);
  };
}
const authStore = new AuthStore();
export default authStore;
