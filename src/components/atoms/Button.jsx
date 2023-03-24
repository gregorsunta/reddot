import styles from '../../styles/atoms/ButtonBase.module.css';
import { Link, NavLink } from 'react-router-dom';

const Button = ({
  children,
  to = null,
  className,
  variant = 'filled',
  activeClassName,
  isActive = false,
  startIcon,
  endIcon,
  ...rest
}) => {
  let Component = 'button';
  const classNames = [
    styles.container,
    className,
    isActive ? activeClassName : '',
  ];

  to && (Component = Link);
  activeClassName && (Component = NavLink);
  variant === 'filled' && classNames.push(styles.filled);
  variant === 'outlined' && classNames.push(styles.outlined);
  variant === 'text' && classNames.push(styles.text);

  return (
    <Component to={to} className={classNames.join(' ')} {...rest}>
      {startIcon}
      {children}
      {endIcon}
    </Component>
  );
};

export { Button };
