import { observer } from 'mobx-react';
import createAuthService from '../../services/AuthService';
import MainTemplate from '../templates/MainTemplate';
import { Button, Input } from '../atoms';
import { Panel, Stack } from '../molecules';
import { LogInForm } from '../organisms';
import { useState } from 'react';
import { FcGoogle } from 'react-icons/fc';
import AuthService from '../../services/AuthService';
import { Navigate } from 'react-router-dom';
import { useStores } from '../../context/authStoreContext';
import PropTypes from 'prop-types';
import { SIZES_REM } from '../../constants';

const LoginPage = observer(({ className }) => {
  const { authStore } = useStores();
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
          <Stack spacing={SIZES_REM.SIZE_16}>
            <Panel>
              <LogInForm></LogInForm>
            </Panel>
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
