import { observer } from 'mobx-react';
import AuthStore from '../../stores/authStore';
import authService from '../../services/AuthService';
import MainTemplate from '../templates/MainTemplate';
import { Button, Input } from '../atoms';
import { getAuth } from 'firebase/auth';
import { useAuth } from '../../context/authContext';
import { useState } from 'react';
import { FcGoogle } from 'react-icons/fc';

const LoginPage = ({ className }) => {
  const AuthStore = useAuth();
  const AuthService = new authService(AuthStore.auth);
  const [isLoading, setIsLoading] = useState(false);

  const Login = async () => {
    setIsLoading(true);
    try {
      const result = await AuthService.signInWithGoogle();
      const user = result.user;
      AuthStore.setUser(user);
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
};

export default LoginPage;
