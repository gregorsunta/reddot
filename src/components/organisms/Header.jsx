import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { createPortal } from 'react-dom';
import { uuidv4 } from '@firebase/util';
import { ButtonGroup, Dropdown, Logo } from '../molecules/';
import { Button, Input } from '../atoms/';
import { withRedirect } from '../../utils';
import { CgProfile } from 'react-icons/cg';
import { AiOutlinePlus } from 'react-icons/ai';
import { IoIosArrowDropdown } from 'react-icons/io';
import { MdOutlineAccountCircle } from 'react-icons/md';
import AuthService from '../../services/AuthService';
import PropTypes from 'prop-types';
import { Modal } from '../molecules/';
import { FcGoogle } from 'react-icons/fc';
import styles from '../../styles/organisms/Header.module.css';
import { LogInForm } from './LogInForm.jsx';

const RedirectLogo = withRedirect(Logo);

const Header = observer(({ className, authStore }) => {
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState();

  const showSignInModal = () => {
    setModalContent(
      <form>
        <Button
          onClose={closeModal}
          startIcon={<FcGoogle />}
          variant="outlined"
        />
      </form>,
    );
    setShowModal(true);
  };
  const closeModal = (e) => {
    setShowModal(false);
    setModalContent(null);
  };

  const anonymousButtons = [
    <Button
      variant="solid"
      children={<span>Login</span>}
      onClick={showSignInModal}
      // className= {ButtonBasic.container}
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
      children={<span>Log In / Sign Up</span>}
      to="/login"
      className=""
      key={uuidv4()}
    />,
  ];
  const authButtons = [
    <Button
      variant="icon"
      title="Add post"
      endIcon={<AiOutlinePlus />}
      to="/submit"
      className=""
      key={uuidv4()}
    />,
  ];
  const authDropdown = [
    <Button
      variant="icon"
      className=""
      startIcon={<CgProfile />}
      key={uuidv4()}
    />,
    <Button
      variant="text"
      children={<span>Dark mode</span>}
      className={``}
      key={uuidv4()}
    />,
    <Button
      variant="text"
      children={<span>Log out</span>}
      className={``}
      onClick={AuthService.signOut}
      key={uuidv4()}
    />,
    <Button
      variant="text"
      children={<span>Terms & policies</span>}
      className={``}
      key={uuidv4()}
    />,

    <Button
      variant="text"
      children={<span>Account</span>}
      to="/account"
      className={`$`}
      startIcon={<MdOutlineAccountCircle />}
      key={uuidv4()}
    />,
  ];

  useEffect(() => {
    showModal && authStore.user && closeModal();
  }, [showModal, authStore.user]);

  return (
    <div className={`${styles.container} ${className}`}>
      <div className={styles['logo-container']}>
        <RedirectLogo link={'/'} />
      </div>
      <Input
        className={styles['search-bar-container']}
        placeholder={'Search reddot'}
      />
      <ButtonGroup
        orientation={'horizontal'}
        className={styles['btn-container']}
      >
        {authStore.user ? authButtons : anonymousButtons}
      </ButtonGroup>
      <Dropdown className={styles['dropdown-container']}>
        {authStore.user ? authDropdown : anonymousDropdown}
      </Dropdown>
      {showModal &&
        createPortal(
          <Modal onClose={closeModal}>{<LogInForm />}</Modal>,
          document.getElementById('root'),
        )}
    </div>
  );
});

Header.propTypes = {
  className: PropTypes.string,
  authStore: PropTypes.object,
};

export default Header;
