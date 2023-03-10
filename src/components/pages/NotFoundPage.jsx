import MainTemplate from '../templates/MainTemplate';

const NotFoundPage = () => {
  return (
    <MainTemplate
      content={<p style={{ fontSize: '3rem' }}>404 Page not found.</p>}
    />
  );
};

export default NotFoundPage;
