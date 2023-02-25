import styles from './Input.module.css';

const SearchBar = ({
  placeholder = '',
  type = 'text',
  className = '',
  emptyValue = false,
}) => {
  return (
    <input
      className={`${styles.container} ${className}`}
      type={type}
      placeholder={placeholder}
      value={emptyValue ? '' : undefined}
    />
  );
};

export default SearchBar;
