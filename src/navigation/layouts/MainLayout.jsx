import { Outlet } from 'react-router-dom';
import Header from '../../components/organisms/Header';

const MainLayout = ({ className }) => {
  return (
    <div className={className}>
      <Header />
      <Outlet />
    </div>
  );
};

export default MainLayout;
