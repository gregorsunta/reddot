import { Button } from '../atoms';
import styles from '../../styles/molecules/panels/HeaderButtons.module.css';
import withRedirect from '../../utils/withRedirect.jsx';
import { useAuth } from '../../context/authContext';
import { observer } from 'mobx-react';

const RedirectButton = withRedirect(Button);

const HeaderButtons = observer(() => {
  const AuthStore = useAuth();

  if (!AuthStore.user) {
    return (
      <>
        <RedirectButton
          className={`${styles['text-button-container']}`}
          title={'Click here to log in'}
          text={'Log in'}
          link={'/login'}
        />
        <RedirectButton
          className={`${styles['text-button-container']} ${styles['highlight']}`}
          title={'Click here to sign up'}
          text={'Sign up'}
          link={'/register'}
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
