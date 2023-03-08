import React from 'react';
import { observer } from 'mobx-react-lite';
import { useAuth } from '../../context/authContext';
import { ButtonsGroup, Dropdown, Logo } from '../molecules/';
import { Input } from '../atoms/';
import { withRedirect } from '../../utils';

import styles from '../../styles/organisms/Header.module.css';
import ButtonFunctionalRound from '../../styles/atoms/ButtonFunctionalRound.module.css';

const dropdownButtons = [
  { text: 'Account', link: '/test1', key: 'account' },
  { text: 'Register or Sign Up', link: '/test1', key: 'alternative' },
];
const unauthenticatedUserButtons = [
  {
    text: 'Log in',
    link: '/login',
    className: ButtonFunctionalRound.container,
    key: 'login',
  },
  {
    text: 'Sign Up',
    className: `${ButtonFunctionalRound.container} ${ButtonFunctionalRound.highlight}`,
    link: '/signup',
    key: 'signup',
  },
];
const authenticatedUserButtons = [
  {
    text: 'Create post',
    link: '/submit',
    className: '',
    key: 'submit',
  },
  { text: 'Sign Up', link: '/signup', key: 'signup' },
];
const RedirectLogo = withRedirect(Logo);
const Header = observer(({ className }) => {
  const AuthStore = useAuth();
  return (
    <div className={`${styles.container} ${className}`}>
      {console.log(AuthStore.user)}
      <div className={styles['logo-container']}>
        <RedirectLogo link={'/'} />
      </div>
      <Input
        className={`${styles['search-bar-container']}`}
        placeholder={'Search reddot'}
      />
      <div className={styles['btn-container']}>
        <ButtonsGroup
          buttons={
            AuthStore.user
              ? authenticatedUserButtons
              : unauthenticatedUserButtons
          }
        />
      </div>
      <Dropdown
        className={`${styles['dropdown-container']}`}
        buttons={dropdownButtons}
      />
    </div>
  );
});

export default Header;
