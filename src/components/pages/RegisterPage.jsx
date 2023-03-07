import { Button, Input } from '../atoms';
import MainTemplate from '../templates/MainTemplate';

const RegisterPage = () => {
  return (
    <MainTemplate
      content={
        <>
          <p>Enter email</p>
          <Input />
          <p>Enter password</p>
          <Input />
          <p>Repeat password</p>
          <Input />
          <Button text={'Register'} />
        </>
      }
    />
  );
};

export default RegisterPage;
