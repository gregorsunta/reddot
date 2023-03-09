import React from 'react';
import { observer } from 'mobx-react-lite';
import { useAuth } from '../../context/authContext';
import { ButtonsGroup, Dropdown, Logo } from '../molecules/';
import { Input } from '../atoms/';
import { withRedirect } from '../../utils';
import { AiOutlinePlus, AiOutlineUser } from 'react-icons/ai';
import { IoIosArrowDropdown } from 'react-icons/io';
import { MdOutlineAccountCircle, MdOutlinePageview } from 'react-icons/md';

import styles from '../../styles/organisms/Header.module.css';
import ButtonBasic from '../../styles/atoms/ButtonBasic.module.css';
import ButtonDropdownItem from '../../styles/atoms/ButtonDropdownItem.module.css';

const anonymousButtons = [
  {
    children: <span>Login</span>,
    to: '/login',
    className: `${ButtonBasic.container}`,
    key: 'login',
  },
  {
    children: <span>Sign up</span>,
    to: '/signup',
    className: `${ButtonBasic.container} ${ButtonBasic.highlight}`,
    key: 'signup',
  },
];
const anonymousDropdown = [
  {
    startIcon: <AiOutlineUser />,
    endIcon: <IoIosArrowDropdown />,
    className: '',
  },
  {
    children: <span>Dark mode</span>,
    key: 'mode',
    className: `${ButtonDropdownItem.container}`,
  },
  {
    children: <span>Terms & policies</span>,
    key: 'terms',
    className: `${ButtonDropdownItem.container}`,
  },
  {
    children: <span>Register or Sign Up</span>,
    href: '/signup',
    key: 'alternative',
    className: `${ButtonDropdownItem.container}`,
  },
];
const authButtons = [
  {
    title: 'Add post',
    startIcon: AiOutlinePlus,
    to: '/submit',
    className: '',
    key: 'submit',
  },
];
const authDropdown = [
  {
    className: '',
    startIcon: <AiOutlineUser />,
  },
  {
    children: <span>Dark mode</span>,
    key: 'mode',
    className: `${ButtonDropdownItem.container}`,
  },
  {
    children: <span>Terms & policies</span>,
    key: 'terms',
    className: `${ButtonDropdownItem.container}`,
  },
  {
    children: <span>Account</span>,
    to: '/account',
    key: 'account',
    className: `${ButtonDropdownItem.container}`,
    startIcon: <MdOutlineAccountCircle />,
  },
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
          buttons={AuthStore.user ? authButtons : anonymousButtons}
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
          buttons={anonymousDropdown}
        />
      )}
    </div>
  );
});

export default Header;
