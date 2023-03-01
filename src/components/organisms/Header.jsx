import React from 'react';
import logo from '../../assets/images/logo.svg';
import styles from '../../styles/organisms/Header.module.css';
import { HeaderButtons, Dropdown } from '../molecules/';
import { Input } from '../atoms/';

const options = [
  { name: 'Account', link: '/test1' },
  { name: 'Register or Sign Up', link: '/test1' },
];

const Header = ({ className }) => {
  return (
    <div className={`${styles.container} ${className}`}>
      <div className={styles['logo-container']}>
        <img style={{ height: '80%' }} src={logo} alt="Outlined robot head." />
        <p>reddot</p>
      </div>
      {/* <div className={styles['search-group-container']}></div> */}
      <Input
        className={`${styles['search-bar-container']}`}
        placeholder={'Search reddot'}
      />
      <div className={styles['btn-container']}>
        <HeaderButtons />
      </div>
      <Dropdown
        className={`${styles['dropdown-container']}`}
        options={options}
      />
    </div>
  );
};

export default Header;
