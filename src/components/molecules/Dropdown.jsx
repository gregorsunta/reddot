import { useEffect, useRef, useState } from 'react';
import { Button } from '../atoms';
import styles from '../../styles/molecules/Dropdown.module.css';
import withRedirect from '../../utils/withRedirect.jsx';

const ButtonWithRedirect = withRedirect(Button);

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
        {buttons.map((option) => {
          if (option.link) {
            return (
              <ButtonWithRedirect
                // className={styles.option}
                link={option.link}
                text={option.name}
                key={option.name}
              >
                {option.name}
              </ButtonWithRedirect>
            );
          } else {
            return (
              <Button
                onClick={option.onClick}
                text={option.name}
                key={option.name}
              >
                {option.name}
              </Button>
            );
          }
        })}
      </ul>
    </div>
  );
};

export { Dropdown };
