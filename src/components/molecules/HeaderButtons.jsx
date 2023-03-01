import { Button } from '../atoms';
import { signInUser } from '../../services/firebase-auth';
import styles from '../../styles/molecules/panels/HeaderButtons.module.css';

const HeaderButtons = ({ auth = false }) => {
  if (!auth) {
    return (
      <>
        <Button
          className={`${styles['text-button-container']}`}
          title={'Click here to log in'}
          text={'Log in'}
          onClick={null}
        />
        <Button
          className={`${styles['text-button-container']} ${styles['highlight']}`}
          title={'Click here to sign up'}
          text={'Sign up'}
          onClick={null}
        />
      </>
    );
  }
  return (
    <>
      <Button title />
    </>
  );
};

export { HeaderButtons };
