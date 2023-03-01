import { Link } from 'react-router-dom';

const withRedirect = (Component) => {
  const WithRedirect = ({ link, ...rest }) => {
    return (
      <Link to={link}>
        <Component {...rest}></Component>
      </Link>
    );
  };
  return WithRedirect;
};

export default withRedirect;
