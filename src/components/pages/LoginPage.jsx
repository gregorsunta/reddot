import { observer } from 'mobx-react';
import createAuthService from '../../services/AuthService';
import MainTemplate from '../templates/MainTemplate';
import { Button, Input } from '../atoms';
import { useState } from 'react';
import { FcGoogle } from 'react-icons/fc';
import AuthService from '../../services/AuthService';
import { Navigate } from 'react-router-dom';
import { useAuthStore } from '../../context/authStoreContext';
import PropTypes from 'prop-types';

const LoginPage = observer(({ className }) => {
  const authStore = useAuthStore();
  const authService = AuthService;
  const [isLoading, setIsLoading] = useState(false);

  const Login = async () => {
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
    <>
      {authStore.user && <Navigate to={'/'} />}
      <MainTemplate
        className={className}
        content={
          <>
            <p>Enter email</p>
            <Input placeholder="email" />
            <p>Enter password</p>
            <Input placeholder="password" />
            <Button variant="outlined" children={<span>Login</span>} />
            <Button
              variant="outlined"
              startIcon={<FcGoogle />}
              children={<span>Continue with google</span>}
              onClick={Login}
            />
          </>
        }
      />
    </>
  );
});

LoginPage.propTypes = {
  className: PropTypes.string,
};

export default LoginPage;
