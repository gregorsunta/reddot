import { signInWithPopup, GoogleAuthProvider, signOut } from 'firebase/auth';

export default class authService {
  constructor(auth) {
    this.auth = auth;
  }
  signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
      return signInWithPopup(this.auth, provider);
    } catch (err) {
      console.log(err);
    }
  };
  signOut = async () => {
    try {
      return await signOut(this.auth);
    } catch (err) {
      console.log(err);
    }
  };
}
