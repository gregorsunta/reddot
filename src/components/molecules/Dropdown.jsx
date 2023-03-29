import React, { useEffect, useRef, useState } from 'react';
import { Button } from '../atoms';
import styles from '../../styles/molecules/Dropdown.module.css';
import { ButtonsGroup } from './ButtonsGroup';

const Dropdown = ({ buttons, className }) => {
  const [mainButton, ...listButtons] = buttons;
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
      <ul className={`${isOpen && styles['active']}`}>
        <ButtonsGroup variant="outlined" orientation="vertical">
          {listButtons}
        </ButtonsGroup>
      </ul>
    </div>
  );
};

export { Dropdown };
