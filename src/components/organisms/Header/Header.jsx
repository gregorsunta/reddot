import styles from './Header.module.css';

const Header = ({ className }) => {
  return (
    <div className={`${className} ${styles.container}`}>
      <p>Reddot</p>
      {/* search bar */}
      {/* buttons? */}
      {/* my profile button - sign out - sign out? */}
    </div>
  );
};

export default Header;
