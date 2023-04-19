import { observer } from 'mobx-react';
import createAuthService from '../../services/AuthService';
import MainTemplate from '../templates/MainTemplate';
import { Button, Input } from '../atoms';
import { Stack } from '../molecules';
import { useState } from 'react';
import { FcGoogle } from 'react-icons/fc';
import AuthService from '../../services/AuthService';
import { Navigate } from 'react-router-dom';
import { useAuthStore } from '../../context/authStoreContext';
import PropTypes from 'prop-types';
import { SIZES } from '../../constants';

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
          <Stack spacing={SIZES.SIZE_16}>
            <Stack>
              <h1>Sign up</h1>
              <h3>Currently we only support Google sign in.</h3>
              <Button
                gap={SIZES.SIZE_8}
                variant="outlined"
                startIcon={<FcGoogle />}
                children={<span>Continue with google</span>}
                onClick={Login}
              />
            </Stack>
          </Stack>
        }
      />
    </>
  );
});

LoginPage.propTypes = {
  className: PropTypes.string,
};

export default LoginPage;
