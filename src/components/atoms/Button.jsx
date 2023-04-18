import PropTypes from 'prop-types';
import { createUseStyles } from 'react-jss';
import classNames from 'classnames';
import { Link, NavLink } from 'react-router-dom';
import { SIZES, ACCENT } from '../../constants/';

const useStyles = createUseStyles({
  container: () => ({
    display: 'flex',
    alignItems: 'center',

    gap: `${SIZES.SIZE_600}`,
    color: 'black',
    textDecoration: 'none',

    minWidth: 'min-content',

    /*to make all buttons the same size*/
    border: `${SIZES.SIZE_2} solid transparent`,
    '& span': {
      backgroundColor: 'transparent',
    },
    '& svg': {
      backgroundColor: 'transparent',
    },
  }),
  icon: {
    width: '20px',
    height: '20px',
  },
  variantIcon: {
    display: 'grid',
    placeContent: 'center',
  },
  variantOutlined: {
    padding: `${SIZES.SIZE_2} ${SIZES.SIZE_16}`,
    whiteSpace: 'nowrap',
    borderRadius: `${SIZES.SIZE_16}`,
    borderColor: `hsl(${ACCENT.HS} ${ACCENT.L4})`,
    color: `hsl(${ACCENT.HS} ${ACCENT.L4})`,
    '&:hover': {
      backgroundColor: `hsl(${ACCENT.HS} ${ACCENT.L4})`,
    },
  },
  variantSolid: {
    padding: `${SIZES.SIZE_2} ${SIZES.SIZE_16}`,

    whiteSpace: 'nowrap',
    borderRadius: `${SIZES.SIZE_16}`,
    backgroundColor: `hsl(${ACCENT.HS} ${ACCENT.L4})`,
    color: 'white',
    '&:hover': { backgroundColor: `hsl(${ACCENT.HS} ${ACCENT.L5})` },
  },
  variantText: {
    padding: `${SIZES.SIZE_16} ${SIZES.SIZE_32}`,
    backgroundColor: 'transparent',
    border: `1px solid hsl(0, 0%, 80%)`,
    borderBottom: `2px solid hsl(0, 0%, 80%)`,
    '&:hover': { backgroundColor: 'hsl(0, 0%, 80%)' },
    active: {
      backgroundColor: 'hsl(0, 0%, 90%)',
      borderBottom: '2px solid hsl(0, 0%, 50%)',
    },
    disabled: {
      color: 'hsl(0, 0%, 50%)',
    },
  },
});
const Button = ({
  type,
  variant,
  children,
  to = null,
  ownerClasses = [], //only two ore more items are allowed
  // activeClassName = null,
  // disabledClassName = null,
  startIcon = null,
  endIcon = null,
  isActive = null,
  isDisabled = false,
  onClick,
}) => {
  let Component = 'button';
  const definedClassNames = useStyles({ variant });
  const containerClassNames = classNames(
    definedClassNames.container,
    variant === 'solid' && definedClassNames.variantSolid,
    variant === 'outlined' && definedClassNames.variantOutlined,
    variant === 'text' && definedClassNames.variantText,
    variant === 'icon' && definedClassNames.variantIcon,
  );
  if (to && isActive) {
    Component = NavLink;
  } else if (to) {
    Component = Link;
  }

  return (
    <Component
      type={type}
      to={to}
      disabled={isDisabled}
      className={containerClassNames}
      onClick={onClick}
    >
      {startIcon && <div className={definedClassNames.icon}>{startIcon}</div>}
      {children}
      {endIcon && <div className={definedClassNames.icon}>{endIcon}</div>}
    </Component>
  );
};
Button.propTypes = {
  variant: PropTypes.oneOf(['outlined', 'icon', 'solid', 'text']).isRequired,
  // children: PropTypes.arrayOf(PropTypes.element),
  to: PropTypes.string,
  ownerClasses: PropTypes.string,
  activeClassName: PropTypes.string,
  disabledClassName: PropTypes.string,
  startIcon: PropTypes.element,
  endIcon: PropTypes.element,
  // isActive: PropTypes.bool,
  isDisabled: PropTypes.bool,
  onClick: PropTypes.func,
};
export { Button };
