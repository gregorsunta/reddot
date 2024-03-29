import { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { useStores } from '../../context/authStoreContext';
import AuthService from '../../services/AuthService';
import { Button } from '../atoms';
import { FcGoogle } from 'react-icons/fc';

const LogInForm = observer(() => {
  const authStore = useStores();
  const [isLoading, setIsLoading] = useState(false);
  const authService = AuthService;
  const login = async () => {
    setIsLoading(true);
    try {
      await authService.signInWithGooglePopup();
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form>
      <h2>Log In</h2>
      <p>
        By continuing, you agree are setting up a Reddit account and agree to
        our User Agreement and Privacy Policy.
      </p>
      <Button
        type="button"
        variant="outlined"
        startIcon={<FcGoogle />}
        children={<span>Continue with google</span>}
        onClick={login}
      />
    </form>
  );
});

export { LogInForm };
