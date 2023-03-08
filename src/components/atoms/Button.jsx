import styles from '../../styles/atoms/Button.module.css';

const Button = ({
  text = null,
  onClick = null,
  className = '',
  activeClassName = '',
  title = undefined,
  isActive = false,
  key = null,
}) => {
  return (
    <button
      title={title}
      className={`${styles.container} ${className} ${
        isActive ? activeClassName : ''
      }`}
      onClick={onClick}
      key={key}
    >
      {text}
    </button>
  );
};

export { Button };
