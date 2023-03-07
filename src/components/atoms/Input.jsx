import styles from '../../styles/atoms/Input.module.css';

const Input = ({
  placeholder = '',
  type = 'text',
  className = '',
  onChange = null,
  readOnly = false,
}) => {
  return (
    <input
      className={`${styles.container} ${className}`}
      type={type}
      placeholder={placeholder}
      readOnly={readOnly}
      onChange={onChange}
    />
  );
};
export { Input };
