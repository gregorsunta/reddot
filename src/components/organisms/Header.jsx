import React from 'react';
import logo from '../../assets/images/logo.svg';
import styles from '../../styles/organisms/Header.module.css';

const Header = ({ className }) => {
  return (
    <div className={`${styles.container} ${className}`}>
      <div className={styles['logo-container']}>
        <img src={logo} alt="Outlined robot head." />
        <p>reddot</p>
      </div>
      <div className={styles['search-group-container']}></div>
      <input className={''} placeholder={'Search reddot'}></input>
      <div className={styles['btn-container']}>
        <button></button>
        <button></button>
        <button></button>
      </div>
      <div className={styles['profile-container']}>Profile</div>
      {/* my profile button - sign out - sign out? */}
    </div>
  );
};

export default Header;
