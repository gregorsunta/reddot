import React from 'react';
import logo from '../../../assets/images/logo.svg';
import styles from './Header.module.css';

const Header = ({ className }) => {
  return (
    <div className={`${styles.container} ${className}`}>
      <img className={styles.logo} src={logo} alt="Outlined robot head." />
      <p className={styles['logo-name']}>reddot</p>
      {/* search bar */}
      {/* buttons? */}
      {/* my profile button - sign out - sign out? */}
    </div>
  );
};

export default Header;
