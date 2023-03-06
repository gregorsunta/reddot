import { makeObservable, observable, action } from 'mobx';
import { Observer } from 'mobx-react';
import { signInUser, signOutUser } from '../services/firebase-auth';

export class authStore {
  user = null;
  userToken = null;
  isLoding = false;
  constructor(auth) {
    this.auth = auth;
    makeObservable(this, {
      user: observable,
      userToken: observable,
      signOut: action,
    });
  }

  signOut = async () => {
    try {
      await signOutUser(this.auth);
    } catch (err) {}
  };
}

// signIn = () => {
//     signInUser();
//   };
