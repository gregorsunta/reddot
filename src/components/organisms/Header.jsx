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
import AuthService from '../../services/AuthService';
import { Button, Input, Stack } from '../atoms/';
import { ButtonGroup, Dropdown, Logo, Modal, Panel } from '../molecules/';
import { LogInForm } from './';
import classNames from 'classnames';
import { useStores, useThemeContext } from '../../context';

const Header = observer(({ className }) => {
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState();
  const theme = useThemeContext();
  const { authStore } = useStores();
  const {
    container,
    logoContainer,
    dropdownContainer,
    btnContainer,
    searchGroupContainer,
    searchBarContainer,
  } = useStyles(theme);
  const allContainerClasses = classNames(container, className);

  const showSignInModal = () => {
    setModalContent(<LogInForm />);
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
      endIcon={<IoIosArrowDropdown />}
      className=""
      key={uuidv4()}
    />,
    <Button
      variant="text"
      children={<span>Dark mode</span>}
      className=""
      onClick={theme.onToggleTheme}
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
      onClick={theme.onToggleTheme}
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
    <Stack
      orientation="row"
      alignItems="center"
      className={allContainerClasses}
    >
      <Logo className={logoContainer} />

      <Input className={searchBarContainer} placeholder={'Search reddot'} />
      <Stack orientation="row" className={btnContainer}>
        {authStore.user ? authenticatedButtons : anonymousButtons}
      </Stack>
      <Dropdown className={dropdownContainer}>
        {authStore.user ? authenticatedDropdown : anonymousDropdown}
      </Dropdown>
      {showModal &&
        createPortal(
          <Modal onClose={closeModal}>{modalContent}</Modal>,
          document.getElementById('root'),
        )}
    </Stack>
  );
});

Header.propTypes = {
  className: PropTypes.string,
  authStore: PropTypes.object,
};

const useStyles = createUseStyles({
  container: {
    justifyContent: 'space-between',
    gap: '2vw',
    position: 'fixed',
    top: 0,
    height: '6vh',
    padding: '0 3vw',
    width: '100vw',
    backgroundColor: ({ theme }) => theme.BACKGROUND_1,
  },
  searchBarContainer: {
    flexGrow: 1,
    borderRadius: '50px',
    padding: '0 2vw',
    height: '80%',
    fontWeight: 400,
    backgroundColor: ({ theme }) => theme.BACKGROUND_2,
    color: 'hsl(0 0% 60%)',
  },
  btnContainer: {
    height: '70%',
    display: 'flex',
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
      backgroundColor: ({ theme }) => theme.BACKGROUND_1,
    },
    '& *': {
      border: 'none',
      // backgroundColor: ({ theme }) => theme.BACKGROUND,
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
