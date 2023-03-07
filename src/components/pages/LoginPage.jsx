import { observer } from 'mobx-react';
import authStore from '../../stores/authStore';
import authService from '../../services/AuthService';
import MainTemplate from '../templates/MainTemplate';
import { Button, Input } from '../atoms';
import { getAuth } from 'firebase/auth';
import { useAuth } from '../../context/authContext';
import { useState } from 'react';

const LoginPage = ({ className }) => {
  const store = useAuth();
  const AuthService = new authService(store.auth);
  const [isLoading, setIsLoading] = useState(false);

  const Login = async () => {
    setIsLoading(true);
    try {
      const result = await AuthService.signInWithGoogle();
      const user = result.user;
      store.setUser(user);
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
          <Button text={'Login'} />
          <Button text={'Sign in with google'} onClick={Login} />
        </>
      }
    />
  );
};

export default LoginPage;
