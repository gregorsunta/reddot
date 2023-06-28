import PropTypes from 'prop-types';
import { createUseStyles } from 'react-jss';
import classNames from 'classnames';
import { Link, NavLink } from 'react-router-dom';
import { SIZES_REM, ACCENT, LIGHTNESS } from '../../constants/';
import { useThemeContext } from '../../context';
import Color from 'color';

const useContainerStyles = createUseStyles({
  container: {
    display: 'inline-flex',
    flexDirection: (direction) => direction,
    gap: (gap) => gap,
    alignItems: 'center',
    justifyContent: 'center',

    color: ({ theme }) => theme.TEXT,
    textDecoration: 'none',

    minWidth: 'min-content',
    width: ({ width }) => width,
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
    backgroundColor: ({ theme }) => theme.PRIMARY_1,
    borderBottom: '2px solid hsl(0, 0%, 50%)',
  },
  disabled: {
    color: 'hsl(0, 0%, 50%)',
  },
  icon: {
    width: `${SIZES_REM.SIZE_24}`,
    height: `${SIZES_REM.SIZE_24}`,
    '& svg': {
      width: `inherit`,
      height: `inherit`,
    },
  },
});
const useVariantStyles = createUseStyles({
  icon: {
    backgroundColor: 'transparent',
    '& div': {
      display: 'grid',
      placeContent: 'center',
    },
    '&:hover': {
      backgroundColor: ({ theme }) => theme.TRANSPARENT_ACTIVE,
    },
  },
  outlined: {
    padding: `${SIZES_REM.SIZE_2} ${SIZES_REM.SIZE_16}`,
    whiteSpace: 'nowrap',
    borderRadius: `${SIZES_REM.SIZE_16}`,
    color: ({ theme }) => theme.PRIMARY,
    borderColor: ({ theme }) => theme.PRIMARY,
    backgroundColor: 'transparent',
    '&:hover': {
      backgroundColor: ({ theme }) =>
        theme.ISLIGHTACTIVE
          ? Color(theme.PRIMARY).lightness(95).toString()
          : Color(theme.PRIMARY).fade(0.9).toString(),
    },
  },
  solid: {
    padding: `${SIZES_REM.SIZE_2} ${SIZES_REM.SIZE_16}`,

    whiteSpace: 'nowrap',
    borderRadius: `${SIZES_REM.SIZE_16}`,
    backgroundColor: ({ theme }) => theme.PRIMARY,
    color: 'white',
    '&:hover': {
      backgroundColor: ({ theme }) =>
        theme.ISLIGHTACTIVE
          ? Color(theme.PRIMARY).lighten(0.1).toString()
          : Color(theme.PRIMARY).lighten(0.1).toString(),
    },
  },
  text: {
    padding: `${SIZES_REM.SIZE_2} ${SIZES_REM.SIZE_16}`,
    backgroundColor: 'transparent',
    '&:hover': {
      backgroundColor: ({ theme }) => theme.TRANSPARENT_ACTIVE,
    },
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
  className = null,
  activeClassName = null,
  disabledClassName = null,
  dataAttributes,
}) => {
  let Component = 'button';
  const { theme } = useThemeContext();
  if (to && isActive) {
    Component = NavLink;
  } else if (to) {
    Component = Link;
  }

  const containerClassNames = useContainerStyles({
    theme,
    width,
    direction,
    gap,
  });
  const containerVariantClassNames = useVariantStyles({ theme });

  const allContainerClassNames = classNames(
    containerClassNames.container,
    variant === 'text' && containerVariantClassNames.text,
    variant === 'outlined' && containerVariantClassNames.outlined,
    variant === 'solid' && containerVariantClassNames.solid,
    variant === 'icon' && containerVariantClassNames.icon,
    isDisabled && (disabledClassName || containerClassNames.disabled),
    isActive && (activeClassName || containerClassNames.active),
    className,
  );

  return (
    <Component
      type={type}
      to={to}
      disabled={isDisabled}
      className={allContainerClassNames}
      onClick={onClick}
      {...dataAttributes}
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
