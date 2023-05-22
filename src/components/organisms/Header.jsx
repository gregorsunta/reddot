import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { createUseStyles } from 'react-jss';
import { observer } from 'mobx-react-lite';
import PropTypes from 'prop-types';
import { uuidv4 } from '@firebase/util';
import { CgProfile } from 'react-icons/cg';
import { AiOutlinePlus } from 'react-icons/ai';
import { IoIosArrowDropdown } from 'react-icons/io';
import { MdOutlineAccountCircle } from 'react-icons/md';
import { FcGoogle } from 'react-icons/fc';
import AuthService from '../../services/AuthService';
import { ButtonGroup, Dropdown, Logo, Modal } from '../molecules/';
import { Button, Input } from '../atoms/';
import { withRedirect } from '../../utils';
import { LogInForm } from './';
import classNames from 'classnames';

const RedirectLogo = withRedirect(Logo);

const Header = observer(({ className, authStore }) => {
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState();
  const {
    container,
    logoContainer,
    dropdownContainer,
    btnContainer,
    searchGroupContainer,
    searchBarContainer,
  } = useStyles();
  const allContainerClasses = classNames(container, className);

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
      key={uuidv4()}
    />,
  ];
  const anonymousDropdown = [
    <Button
      variant="text"
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
  const authenticatedButtons = [
    <Button
      variant="icon"
      title="Add post"
      endIcon={<AiOutlinePlus />}
      to="/submit"
      className=""
      key={uuidv4()}
    />,
  ];
  const authenticatedDropdown = [
    <Button
      variant="text"
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
    <div className={allContainerClasses}>
      <div className={logoContainer}>
        <RedirectLogo link={'/'} />
      </div>
      <Input className={searchBarContainer} placeholder={'Search reddot'} />
      <ButtonGroup orientation={'horizontal'} className={btnContainer}>
        {authStore.user ? authenticatedButtons : anonymousButtons}
      </ButtonGroup>
      <Dropdown className={dropdownContainer}>
        {authStore.user ? authenticatedDropdown : anonymousDropdown}
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

const useStyles = createUseStyles({
  container: {
    display: 'flex',
    alignItems: 'center',
    gap: '2vw',
    position: 'fixed',
    top: 0,
    height: '6vh',
    padding: '0 3vw',
    width: '100vw',
    backgroundColor: 'white',
  },
  logoContainer: {
    flex: '0 0 auto',
    height: '100%',
    textDecoration: 'none',
    '& > *': {
      textDecoration: 'none',
    },
    '& > *:visited': {
      color: 'inherit',
    },
    '& img': {
      height: '100%',
    },
    '& p': {
      fontSize: 'var(--size-6)',
      textShadow: '1px 1px hsl(0 0% 60%)',
      letterSpacing: '-1px',
      '@media (max-width: 920px)': {
        display: 'none',
      },
    },
  },
  searchBarContainer: {
    flexGrow: 1,
    border: 'var(--size-09) solid hsl(0 0% 60%)',
    borderRadius: '50px',
    padding: '0 2vw',
    fontSize: 'var(--size-5)',
    height: '80%',
    fontWeight: 400,
    backgroundColor: 'var(--gray-2)',
    color: 'hsl(0 0% 60%)',
  },
  btnContainer: {
    height: '70%',
    display: 'flex',
    gap: 'var(--size-5)',
  },
  dropdownContainer: {
    height: '70%',
    '& > button': {
      display: 'flex',
      height: '100%',
      width: '2.5rem',
    },
    '& > ul': {
      right: '0',
      backgroundColor: 'white',
    },
    '& *': {
      border: 'none',
      backgroundColor: 'white',
    },
  },
  '@media (max-width: 780px)': {
    btnContainer: { display: 'none' },
  },
  '@media (max-width: 500px)': {
    searchBarContainer: {
      display: 'none',
    },
  },
});

export default Header;
