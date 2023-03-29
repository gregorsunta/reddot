import React from 'react';
import { observer } from 'mobx-react-lite';
import { uuidv4 } from '@firebase/util';
import { ButtonsGroup, Dropdown, Logo } from '../molecules/';
import { Button, Input } from '../atoms/';
import { withRedirect } from '../../utils';
import { CgProfile } from 'react-icons/cg';
import { IoIosArrowDropdown } from 'react-icons/io';
import { MdOutlineAccountCircle } from 'react-icons/md';
import AuthService from '../../services/AuthService';

import styles from '../../styles/organisms/Header.module.css';
import ButtonDropdownItem from '../../styles/atoms/ButtonDropdownItem.module.css';

const RedirectLogo = withRedirect(Logo);

const Header = observer(({ className, authStore }) => {
  const anonymousButtons = [
    <Button
      variant="outlined"
      children={<span>Login</span>}
      to="/login"
      // className= {ButtonBasic.container}
      key={uuidv4()}
    />,
    <Button
      variant="solid"
      children={<span>Sign up</span>}
      to="/signup"
      // className= {[ButtonBasic.container, ButtonBasic.highlight].join(' ')}
      key={uuidv4()}
    />,
  ];
  const anonymousDropdown = [
    <Button
      variant="icon"
      startIcon={<CgProfile />}
      endIcon={<IoIosArrowDropdown />}
      className=""
      key={uuidv4()}
    />,
    <Button
      variant="text"
      children={<span>Dark mode</span>}
      className=""
      key={uuidv4()}
    />,
    <Button
      variant="text"
      children={<span>Terms & policies</span>}
      className=""
      key={uuidv4()}
    />,
    <Button
      variant="text"
      children={<span>Register or Sign Up</span>}
      href="/signup"
      className=""
      key={uuidv4()}
    />,
  ];
  const authButtons = [
    <Button
      variant="icon"
      title="Add post"
      endIcon={<CgProfile />}
      to="/submit"
      className=""
      key={uuidv4()}
    />,
  ];
  const authDropdown = [
    <Button variant="icon" className="" startIcon={<CgProfile />} />,
    <Button
      variant="text"
      children={<span>Dark mode</span>}
      className={`${ButtonDropdownItem.container}`}
      key={uuidv4()}
    />,
    <Button
      variant="text"
      children={<span>Log out</span>}
      className={`${ButtonDropdownItem.container}`}
      onClick={AuthService.signOut}
      key={uuidv4()}
    />,
    <Button
      variant="text"
      children={<span>Terms & policies</span>}
      className={`${ButtonDropdownItem.container}`}
      key={uuidv4()}
    />,

    <Button
      variant="text"
      children={<span>Account</span>}
      to="/account"
      className={`${ButtonDropdownItem.container}`}
      startIcon={<MdOutlineAccountCircle />}
      key={uuidv4()}
    />,
  ];
  return (
    <div className={`${styles.container} ${className}`}>
      <div className={styles['logo-container']}>
        <RedirectLogo link={'/'} />
      </div>
      <Input
        className={styles['search-bar-container']}
        placeholder={'Search reddot'}
      />
      <ButtonsGroup
        className={styles['btn-container']}
        buttons={authStore.user ? authButtons : anonymousButtons}
      />
      <Dropdown
        className={styles['dropdown-container']}
        buttons={authStore.user ? authDropdown : anonymousDropdown}
      />
    </div>
  );
});

export default Header;
