import React from 'react';
import logo from '../../assets/images/logo.svg';
import styles from '../../styles/molecules/Logo.module.css';

const Logo = () => (
  <div className={styles.container}>
    <img className={styles.logo} src={logo} alt="Outlined robot head." />
    <p className={styles.text}>reddot</p>
  </div>
);

export default Logo;
