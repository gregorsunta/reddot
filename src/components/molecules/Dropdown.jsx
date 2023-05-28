import React, { useEffect, useRef, useState } from 'react';
import { createUseStyles } from 'react-jss';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { ButtonGroup } from './';
import { useThemeContext } from '../../context';

const Dropdown = ({ className, children }) => {
  const { theme } = useThemeContext();
  const [mainButton, ...listItems] = children; //the first button is always the list opener
  const [isOpen, setIsOpen] = useState(false);
  const container = useRef(null);
  const expectedClassesString = useStyles({ theme });
  const containerClassNames = classNames(
    expectedClassesString.container,
    className,
  );

  const toggleList = () => {
    setIsOpen(!isOpen);
  };

  const MainButtonProps = {
    ...mainButton.props,
    onClick: toggleList,
  };

  const MainButton = React.cloneElement(mainButton, MainButtonProps);

  useEffect(() => {
    function handleClickOutside(e) {
      if (container.current && !container.current.contains(e.target))
        setIsOpen(false);
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [container]);

  return (
    <div className={containerClassNames} ref={container}>
      {MainButton}
      <ButtonGroup
        variant="outlined"
        orientation="vertical"
        className={`${isOpen && expectedClassesString.active} ${
          expectedClassesString.list
        }`}
      >
        {listItems}
      </ButtonGroup>
    </div>
  );
};

Dropdown.propTypes = {
  className: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]),
};

const useStyles = createUseStyles({
  container: {
    position: 'relative',
  },
  list: {
    position: 'absolute',
    display: 'flex',
    list: {},
    flexDirection: 'column',
    gap: 'var(--size-3)',
    padding: 0,
    height: 0,
    background: ({ theme }) => theme.SECONDARY_BACKGROUND,

    overflow: 'hidden',

    '& *': {
      textAlign: 'left',
      whiteSpace: 'nowrap',
    },
  },
  active: {
    height: 'auto',
    padding: '2vh 2vh',
    border: 'var(--size-09) solid hsl(0 0% 60%)',
    borderRadius: 'var(--size-3)',
  },
});

export { Dropdown };
