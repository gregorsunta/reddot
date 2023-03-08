import styles from '../../styles/atoms/Button.module.css';

const Button = ({
  text = null,
  onClick = null,
  isActive = false,
  className = '',
  activeClassName = '',
  title = undefined,
  key = null,
}) => {
  return (
    <button
      title={title}
      className={`${className} ${isActive ? activeClassName : ''}`}
      onClick={onClick}
      key={key}
    >
      {text}
    </button>
  );
};

export { Button };
