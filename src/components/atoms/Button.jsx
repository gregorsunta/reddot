import styles from '../../styles/atoms/Button.module.css';

const Button = ({
  text = null,
  onClick = null,
  className = '',
  title = undefined,
}) => {
  return (
    <button title={title} className={`${''} ${className}`} onClick={onClick}>
      {text}
    </button>
  );
};

export { Button };
