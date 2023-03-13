import { observer } from 'mobx-react';
import createAuthService from '../../services/AuthService';
import MainTemplate from '../templates/MainTemplate';
import { Button, Input } from '../atoms';
import { useRoot } from '../../context/rootStoreContext';
import { useState } from 'react';
import { FcGoogle } from 'react-icons/fc';
import AuthService from '../../services/AuthService';

const LoginPage = observer(({ className }) => {
  const rootStore = useRoot();
  const authService = AuthService;
  const [isLoading, setIsLoading] = useState(false);

  const Login = async () => {
    setIsLoading(true);
    try {
      const result = await authService.signInWithGoogle();
      const user = result.user;
      rootStore.setUser(user);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <MainTemplate
      className={className}
      content={
        <>
          <p>Enter email</p>
          <Input placeholder="email" />
          <p>Enter password</p>
          <Input placeholder="password" />
          <Button children={<span>Login</span>} />
          <Button
            variant="text"
            startIcon={<FcGoogle />}
            children={<span>Continue with google</span>}
            onClick={Login}
          />
        </>
      }
    />
  );
});

export default LoginPage;
