import styles from '../../styles/atoms/Button.module.css';

const Button = ({
  text,
  className,
  activeClassName,
  isActive = false,
  icon,
  ...rest
}) => {
  return (
    <button
      className={`${styles.container} ${className} ${
        isActive ? activeClassName : ''
      }`}
      {...rest}
    >
      {icon}
      {text}
    </button>
  );
};

export { Button };
