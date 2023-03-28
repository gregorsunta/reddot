import styles from '../../styles/atoms/ButtonBase.module.css';
import { Link, NavLink } from 'react-router-dom';
import { useEffect } from 'react';

const Button = ({
  children,
  to = null,
  className,
  variant = 'filled',
  activeClassName = null,
  isActive = false,
  startIcon = null,
  endIcon = null,
  disabled = false,
  ...rest
}) => {
  let Component = 'button';

  useEffect(() => {
    const variants = ['text', 'outlined', 'filled', 'icon'];
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
      {startIcon && <div className={styles.icon}>{startIcon}</div>}
      {children}
      {endIcon && <div className={styles.icon}>{endIcon}</div>}
    </Component>
  );
};

export { Button };
