import React from 'react';
import styles from '../../styles/organisms/Header.module.css';
import { HeaderButtons, Dropdown } from '../molecules/';
import { Input } from '../atoms/';
import withRedirect from '../../utils/withRedirect';
import Logo from '../molecules/Logo.jsx';

const options = [
  { name: 'Account', link: '/test1' },
  { name: 'Register or Sign Up', link: '/test1' },
];

const RedirectLogo = withRedirect(Logo);
const Header = ({ className }) => {
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
