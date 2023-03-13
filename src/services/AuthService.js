import { signInWithPopup, GoogleAuthProvider, signOut } from 'firebase/auth';

class AuthService {
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

const createAuthService = () => {
  let instance = null;
  if (!instance) {
    instance = new AuthService();
  }
  console.error('Only one instance of AuthService is allowed');
};

export default createAuthService;
