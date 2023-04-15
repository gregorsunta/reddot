import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import styles from '../../styles/molecules/Dropdown.module.css';
import { ButtonGroup } from './';

const Dropdown = ({ className, children }) => {
  const [mainButton, ...listItems] = children; //the first button is always the list opener
  const [isOpen, setIsOpen] = useState(false);
  const container = useRef(null);
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
    <div className={`${styles.container} ${className}`} ref={container}>
      {MainButton}
      <ButtonGroup
        variant="outlined"
        orientation="vertical"
        ownerClasses={`${isOpen && styles.active} ${styles.list}`}
      >
        {listItems}
      </ButtonGroup>
    </div>
  );
};

Dropdown.propTypes = {
  className: PropTypes.string,
  children: PropTypes.array,
};

export { Dropdown };
