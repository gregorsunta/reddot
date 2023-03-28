import styles from '../../styles/atoms/ButtonBase.module.css';
import { Link, NavLink } from 'react-router-dom';
import { useEffect } from 'react';

const Button = ({
  children,
  to = null,
  className,
  variant = 'filled',
  activeClassName,
  isActive = false,
  startIcon,
  endIcon,
  disabled,
  ...rest
}) => {
  let Component = 'button';

  useEffect(() => {
    const variants = ['text', 'outlined', 'filled'];
    if (!variants.includes(variant)) {
      console.error(`The button variant "${variant}" does not exist`);
    }
  }, [variant]);

  if (to && activeClassName) {
    Component = NavLink;
  } else if (to) {
    Component = Link;
  }

  return (
    <Component
      to={to}
      disabled={disabled}
      className={[
        styles.container,
        className,
        styles[`${variant}`],
        isActive ? activeClassName : '',
      ].join(' ')}
      {...rest}
    >
      <div className={styles.icon}>{startIcon}</div>
      {children}
      <div className={styles.icon}>{endIcon}</div>
    </Component>
  );
};

export { Button };
