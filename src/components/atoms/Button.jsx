import PropTypes from 'prop-types';
import styles from '../../styles/atoms/ButtonBase.module.css';
import { Link, NavLink } from 'react-router-dom';
import { useEffect, useState } from 'react';

const createExpectedClasses = (expectedProps) => {
  return [styles[`variant-${expectedProps.variant}`], styles.container].join(
    ' ',
  );
};

const Button = ({
  variant,
  children,
  to = null,
  ownerClasses = [],
  // activeClassName = null,
  // disabledClassName = null,
  startIcon = null,
  endIcon = null,
  isActive = null,
  isDisabled = false,
  onClick,
}) => {
  let Component = 'button';
  const [dynamicClasses, setDynamicClasses] = useState();
  const expectedProps = { variant };
  const expectedClasses = createExpectedClasses(expectedProps);

  if (to && isActive) {
    Component = NavLink;
  } else if (to) {
    Component = Link;
  }

  return (
    <Component
      to={to}
      disabled={isDisabled}
      className={`${expectedClasses} ${ownerClasses} ${
        isActive && styles.active
      } ${isDisabled && styles.disabled}`}
      onClick={onClick}
    >
      {startIcon && <div className={styles.icon}>{startIcon}</div>}
      {children}
      {endIcon && <div className={styles.icon}>{endIcon}</div>}
    </Component>
  );
};
Button.propTypes = {
  variant: PropTypes.oneOf(['outlined', 'icon', 'solid', 'text']).isRequired,
  // children: PropTypes.arrayOf(PropTypes.element),
  to: PropTypes.string,
  ownerClasses: PropTypes.arrayOf(PropTypes.string),
  activeClassName: PropTypes.string,
  disabledClassName: PropTypes.string,
  startIcon: PropTypes.element,
  endIcon: PropTypes.element,
  // isActive: PropTypes.bool,
  isDisabled: PropTypes.bool,
  onClick: PropTypes.func,
};
export { Button };
