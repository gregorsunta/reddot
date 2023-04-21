import PropTypes from 'prop-types';
import { createUseStyles } from 'react-jss';
import classNames from 'classnames';
import { Link, NavLink } from 'react-router-dom';
import { SIZES_REM, ACCENT, NEUTRAL, LIGHTNESS } from '../../constants/';

const useContainerStyles = createUseStyles({
  container: {
    display: 'inline-flex',
    flexDirection: (direction) => direction,
    gap: (gap) => gap,
    alignItems: 'center',

    color: 'black',
    textDecoration: 'none',

    minWidth: 'min-content',
    width: (width) => width,
    /*to make all buttons the same size*/
    borderWidth: `${SIZES_REM.SIZE_2}`,
    borderStyle: 'solid',
    borderColor: 'transparent',
    '& span': {
      backgroundColor: 'transparent',
    },
    '& svg': {
      backgroundColor: 'transparent',
    },
  },
  active: {
    backgroundColor: 'hsl(0, 0%, 90%)',
    borderBottom: '2px solid hsl(0, 0%, 50%)',
  },
  disabled: {
    color: 'hsl(0, 0%, 50%)',
  },
  icon: {
    width: `20px`,
    height: `20px`,
    '& svg': {
      width: `inherit`,
      height: `inherit`,
    },
  },
});
const useVariantStyles = createUseStyles({
  icon: {
    '& div': {
      display: 'grid',
      placeContent: 'center',
    },
  },
  outlined: {
    padding: `${SIZES_REM.SIZE_2} ${SIZES_REM.SIZE_16}`,
    whiteSpace: 'nowrap',
    borderRadius: `${SIZES_REM.SIZE_16}`,
    borderColor: `hsl(${ACCENT.HS} ${LIGHTNESS.L_40})`,
    color: `hsl(${ACCENT.HS} ${LIGHTNESS.L_40})`,
    backgroundColor: 'white',
    '&:hover': {
      backgroundColor: `hsl(${ACCENT.HS} ${LIGHTNESS.L_95})`,
    },
  },
  solid: {
    padding: `${SIZES_REM.SIZE_2} ${SIZES_REM.SIZE_16}`,

    whiteSpace: 'nowrap',
    borderRadius: `${SIZES_REM.SIZE_16}`,
    backgroundColor: `hsl(${ACCENT.HS} ${LIGHTNESS.L_40})`,
    color: 'white',
    '&:hover': { backgroundColor: `hsl(${ACCENT.HS} ${LIGHTNESS.L_45})` },
  },
  text: {
    padding: `${SIZES_REM.SIZE_2} ${SIZES_REM.SIZE_16}`,
    backgroundColor: 'transparent',
    '&:hover': { backgroundColor: `hsl(${NEUTRAL.HS} ${LIGHTNESS.L_95})` },
  },
});
const Button = ({
  type,
  variant,
  children,
  to = null,
  width,
  direction,
  gap = SIZES_REM.SIZE_8,
  onClick,
  isActive = null,
  isDisabled = false,
  startIcon = null,
  endIcon = null,
  customClassName = null,
  activeClassName = null,
  disabledClassName = null,
}) => {
  let Component = 'button';

  if (to && isActive) {
    Component = NavLink;
  } else if (to) {
    Component = Link;
  }

  const containerClassNames = useContainerStyles({ width, direction, gap });
  const containerVariantClassNames = useVariantStyles();

  const allContainerClassNames = classNames(
    containerClassNames.container,
    variant === 'text' && containerVariantClassNames.text,
    variant === 'outlined' && containerVariantClassNames.outlined,
    variant === 'solid' && containerVariantClassNames.solid,
    variant === 'icon' && containerVariantClassNames.icon,
    isDisabled && (disabledClassName || containerClassNames.disabled),
    isActive && (activeClassName || containerClassNames.active),
    customClassName,
  );

  return (
    <Component
      type={type}
      to={to}
      disabled={isDisabled}
      className={allContainerClassNames}
      onClick={onClick}
    >
      {startIcon && (
        <span className={containerClassNames.icon}>{startIcon}</span>
      )}
      {children}
      {endIcon && <span className={containerClassNames.icon}>{endIcon}</span>}
    </Component>
  );
};
Button.propTypes = {
  variant: PropTypes.oneOf(['outlined', 'icon', 'solid', 'text']).isRequired,
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]),
  direction: PropTypes.oneOf(['row', 'column']),
  gap: PropTypes.string,
  to: PropTypes.string,
  customClassName: PropTypes.string,
  activeClassName: PropTypes.string,
  disabledClassName: PropTypes.string,
  startIcon: PropTypes.element,
  endIcon: PropTypes.element,
  isActive: PropTypes.bool,
  isDisabled: PropTypes.bool,
  onClick: PropTypes.func,
};
export { Button };
