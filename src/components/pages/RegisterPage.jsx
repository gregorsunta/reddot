import { Button, Input } from '../atoms';
import MainTemplate from '../templates/MainTemplate';

const RegisterPage = () => {
  return (
    <MainTemplate
      content={
        <>
          <p>
            Signing up with email and password is not supported at the moment,
            but you can sign up google instead. Click on the button below.
          </p>
          <Button variant="solid" to={'/login'}>
            Take me to the login page
          </Button>
        </>
      }
    />
  );
};

export default RegisterPage;
