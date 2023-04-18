import PropTypes from 'prop-types';
import { createUseStyles } from 'react-jss';
import classNames from 'classnames';
import { Link, NavLink } from 'react-router-dom';
import { SIZES, ACCENT } from '../../constants/';

const useContainerStyles = createUseStyles({
  container: () => ({
    display: 'flex',
    alignItems: 'center',

    gap: `${SIZES.SIZE_600}`,
    color: 'black',
    textDecoration: 'none',

    minWidth: 'min-content',

    /*to make all buttons the same size*/
    borderWidth: `${SIZES.SIZE_2}`,
    borderStyle: 'solid',
    borderColor: 'transparent',

    '& span': {
      backgroundColor: 'transparent',
    },
    '& svg': {
      backgroundColor: 'transparent',
    },
  }),
  container__icon: {
    width: '20px',
    height: '20px',
  },
  active: {
    backgroundColor: 'hsl(0, 0%, 90%)',
    borderBottom: '2px solid hsl(0, 0%, 50%)',
  },
  disabled: {
    color: 'hsl(0, 0%, 50%)',
  },
});
const useVariantsStyles = createUseStyles({
  icon: {
    display: 'grid',
    placeContent: 'center',
  },
  outlined: {
    padding: `${SIZES.SIZE_2} ${SIZES.SIZE_16}`,
    whiteSpace: 'nowrap',
    borderRadius: `${SIZES.SIZE_16}`,
    borderColor: `hsl(${ACCENT.HS} ${ACCENT.L40})`,
    borderWidth: '2px',
    color: `hsl(${ACCENT.HS} ${ACCENT.L40})`,
    '&:hover': {
      backgroundColor: `hsl(${ACCENT.HS} ${ACCENT.L95})`,
    },
  },
  solid: {
    padding: `${SIZES.SIZE_2} ${SIZES.SIZE_16}`,

    whiteSpace: 'nowrap',
    borderRadius: `${SIZES.SIZE_16}`,
    backgroundColor: `hsl(${ACCENT.HS} ${ACCENT.L40})`,
    color: 'white',
    '&:hover': { backgroundColor: `hsl(${ACCENT.HS} ${ACCENT.L45})` },
  },
  text: {
    padding: `${SIZES.SIZE_16} ${SIZES.SIZE_32}`,
    backgroundColor: 'transparent',
    border: `1px solid hsl(0, 0%, 80%)`,
    borderBottom: `2px solid hsl(0, 0%, 80%)`,
    '&:hover': { backgroundColor: 'hsl(0, 0%, 80%)' },
  },
});
const Button = ({
  type,
  variant,
  children,
  to = null,
  ownerClasses = [],
  activeClassName = null,
  disabledClassName = null,
  startIcon = null,
  endIcon = null,
  isActive = null,
  isDisabled = false,
  onClick,
}) => {
  let Component = 'button';
  const containerClassNames = useContainerStyles();
  const variantsClassNames = useVariantsStyles({ variant });

  const allClassNames = classNames(
    containerClassNames.container,
    variantsClassNames[variant],
    isDisabled && (disabledClassName || containerClassNames.disabled),
    isActive && (activeClassName || containerClassNames.active),
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
      className={allClassNames}
      onClick={onClick}
    >
      {console.log(containerClassNames['outlined'])}
      {startIcon && (
        <div className={containerClassNames.container__icon}>{startIcon}</div>
      )}
      {children}
      {endIcon && (
        <div className={containerClassNames.container__icon}>{endIcon}</div>
      )}
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
  isActive: PropTypes.bool,
  isDisabled: PropTypes.bool,
  onClick: PropTypes.func,
};
export { Button };
