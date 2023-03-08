import { useEffect, useRef, useState } from 'react';
import { Button } from '../atoms';
import styles from '../../styles/molecules/Dropdown.module.css';
import { ButtonsGroup } from './ButtonsGroup';

const Dropdown = ({ buttons, className }) => {
  const [isOpen, setIsOpen] = useState(false);
  const container = useRef(null);

  const toggleList = () => {
    setIsOpen(!isOpen);
  };

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
      <Button
        className={`${isOpen && styles['active']}`}
        text={'Profile'}
        onClick={toggleList}
      />
      <ul className={`${isOpen && styles['active']}`}>
        <ButtonsGroup buttons={buttons} />
      </ul>
    </div>
  );
};

export { Dropdown };
