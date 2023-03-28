import {
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  getAuth,
} from 'firebase/auth';

class AuthService {
  signInWithGooglePopup = async () => {
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

const authService = new AuthService();
export default authService;
