import React from 'react';
import { observer } from 'mobx-react-lite';
import { useRoot } from '../../context/rootStoreContext';
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
    variant: 'outlined',
    // className: ButtonBasic.container,
    key: 'login',
  },
  {
    children: <span>Sign up</span>,
    to: '/signup',
    variant: 'filled',
    // className: [ButtonBasic.container, ButtonBasic.highlight].join(' '),
    key: 'signup',
  },
];
const anonymousDropdown = [
  {
    variant: 'text',
    startIcon: <AiOutlineUser />,
    endIcon: <IoIosArrowDropdown />,
    className: '',
  },
  {
    variant: 'text',
    children: <span>Dark mode</span>,
    key: 'mode',
    className: '',
  },
  {
    variant: 'text',
    children: <span>Terms & policies</span>,
    key: 'terms',
    className: '',
  },
  {
    variant: 'text',
    children: <span>Register or Sign Up</span>,
    href: '/signup',
    key: 'alternative',
    className: '',
  },
];
const authButtons = [
  {
    title: 'Add post',
    variant: 'text',
    startIcon: <AiOutlinePlus />,
    to: '/submit',
    className: '',
    key: 'submit',
  },
];
const authDropdown = [
  {
    variant: 'text',
    className: '',
    startIcon: <AiOutlineUser />,
  },
  {
    variant: 'text',
    children: <span>Dark mode</span>,
    key: 'mode',
    className: `${ButtonDropdownItem.container}`,
  },
  {
    variant: 'text',
    children: <span>Terms & policies</span>,
    key: 'terms',
    className: `${ButtonDropdownItem.container}`,
  },
  {
    variant: 'text',
    children: <span>Account</span>,
    to: '/account',
    key: 'account',
    className: `${ButtonDropdownItem.container}`,
    startIcon: <MdOutlineAccountCircle />,
  },
];

const RedirectLogo = withRedirect(Logo);
const Header = observer(({ className, isSignedIn }) => {
  return (
    <div className={`${styles.container} ${className}`}>
      <div className={styles['logo-container']}>
        <RedirectLogo link={'/'} />
      </div>
      <Input
        className={`${styles['search-bar-container']}`}
        placeholder={'Search reddot'}
      />
      <ButtonsGroup
        className={styles['btn-container']}
        buttons={isSignedIn ? authButtons : anonymousButtons}
      />
      <Dropdown
        className={styles['dropdown-container']}
        buttons={isSignedIn ? authDropdown : anonymousDropdown}
      />
    </div>
  );
});

export default Header;
