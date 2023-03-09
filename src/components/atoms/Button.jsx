import styles from '../../styles/atoms/ButtonBase.module.css';
import { Link, NavLink } from 'react-router-dom';

const Button = ({
  children,
  to = null,
  className,
  activeClassName,
  isActive = false,
  startIcon,
  endIcon,
  ...rest
}) => {
  let Component = 'button';
  if (to) {
    Component = Link;
  }
  if (activeClassName) {
    Component = NavLink;
  }
  return (
    <Component to={to} className={`${className} ${styles.container}`} {...rest}>
      {startIcon}
      {children}
      {endIcon}
    </Component>
  );
};

export { Button };
