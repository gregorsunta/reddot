import React from 'react';
import { observer } from 'mobx-react-lite';
import { useAuth } from '../../context/authContext';
import { ButtonsGroup, Dropdown, Logo } from '../molecules/';
import { Input } from '../atoms/';
import { withRedirect } from '../../utils';
import { AiOutlinePlus, AiOutlineUser } from 'react-icons/ai';
import { IoIosArrowDropdown } from 'react-icons/io';
import styles from '../../styles/organisms/Header.module.css';
import ButtonFunctionalRound from '../../styles/atoms/ButtonFunctionalRound.module.css';

const unauthDropdown = [
  {
    icon: (
      <>
        <AiOutlineUser /> <IoIosArrowDropdown />
      </>
    ),
  },
  { text: 'Dark mode', key: 'mode' },
  { text: 'Terms & policies', key: 'terms' },
  { text: 'Account', link: '/account', key: 'account' },
  { text: 'Register or Sign Up', link: '/signup', key: 'alternative' },
];
const authDropdown = [
  { icon: <AiOutlineUser /> },
  { text: 'Account', link: '/account', key: 'account' },
  { text: 'Register or Sign Up', link: '/signup', key: 'alternative' },
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
    title: 'Add post',
    icon: <AiOutlinePlus />,
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
      {AuthStore.user ? (
        <Dropdown
          className={`${styles['dropdown-container']}`}
          buttons={authDropdown}
        />
      ) : (
        <Dropdown
          className={`${styles['dropdown-container']}`}
          buttons={unauthDropdown}
        />
      )}
    </div>
  );
});

export default Header;
