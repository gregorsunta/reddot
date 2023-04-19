import PropTypes from 'prop-types';
import { createUseStyles } from 'react-jss';
import classNames from 'classnames';
import { Link, NavLink } from 'react-router-dom';
import { SIZES, ACCENT, NEUTRAL, LIGHTNESS } from '../../constants/';

const useContainerStyles = createUseStyles({
  container: ({ width }) => ({
    color: 'black',
    textDecoration: 'none',

    minWidth: 'min-content',
    width: `${width}`,
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
  active: {
    backgroundColor: 'hsl(0, 0%, 90%)',
    borderBottom: '2px solid hsl(0, 0%, 50%)',
  },
  disabled: {
    color: 'hsl(0, 0%, 50%)',
  },
});
const useContentStyles = createUseStyles({
  main: ({ direction, gap }) => ({
    display: 'flex',
    flexDirection: `${direction}`,
    gap: `${gap}`,
  }),
  icon: {
    width: `${SIZES.SIZE_20}`,
    height: `${SIZES.SIZE_20}`,
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
    padding: `${SIZES.SIZE_2} ${SIZES.SIZE_16}`,
    whiteSpace: 'nowrap',
    borderRadius: `${SIZES.SIZE_16}`,
    borderColor: `hsl(${ACCENT.HS} ${LIGHTNESS.L_40})`,
    color: `hsl(${ACCENT.HS} ${LIGHTNESS.L_40})`,
    backgroundColor: 'white',
    '&:hover': {
      backgroundColor: `hsl(${ACCENT.HS} ${LIGHTNESS.L_95})`,
    },
  },
  solid: {
    padding: `${SIZES.SIZE_2} ${SIZES.SIZE_16}`,

    whiteSpace: 'nowrap',
    borderRadius: `${SIZES.SIZE_16}`,
    backgroundColor: `hsl(${ACCENT.HS} ${LIGHTNESS.L_40})`,
    color: 'white',
    '&:hover': { backgroundColor: `hsl(${ACCENT.HS} ${LIGHTNESS.L_45})` },
  },
  text: {
    padding: `${SIZES.SIZE_2} ${SIZES.SIZE_16}`,
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
  gap = SIZES.SIZE_8,
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
  const containerClassNames = useContainerStyles({ width });
  const containerVariantClassNames = useVariantStyles();
  const contentClassNames = useContentStyles({ direction, gap });

  const allContainerClassNames = classNames(
    containerClassNames.container,
    containerVariantClassNames[variant],
    isDisabled && (disabledClassName || containerClassNames.disabled),
    isActive && (activeClassName || containerClassNames.active),
    customClassName,
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
      className={allContainerClassNames}
      onClick={onClick}
    >
      <div className={contentClassNames.main}>
        {startIcon && <div className={contentClassNames.icon}>{startIcon}</div>}
        {children}
        {endIcon && <div className={contentClassNames.icon}>{endIcon}</div>}
      </div>
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
