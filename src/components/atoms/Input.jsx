import styles from '../../styles/atoms/Input.module.css';

const Input = ({
  placeholder = '',
  type = 'text',
  className = '',
  readOnly = false,
}) => {
  return (
    <input
      className={`${styles.container} ${className}`}
      type={type}
      placeholder={placeholder}
      readOnly={readOnly}
    />
  );
};
export { Input };
