import {
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  getAuth,
} from 'firebase/auth';

class AuthService {
  signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
      return signInWithPopup(getAuth(), provider);
    } catch (err) {
      console.log(err);
    }
  };
  signOut = async () => {
    try {
      return await signOut(getAuth());
    } catch (err) {
      console.log(err);
    }
  };
}

export default new AuthService();
