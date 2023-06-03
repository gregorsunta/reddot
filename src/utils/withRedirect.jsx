import { Link } from 'react-router-dom';

const withRedirect = (Component) => {
  const { link, ...rest } = Component;
  return (
    <Link to={link}>
      <Component {...rest}></Component>
    </Link>
  );
};

export { withRedirect };
