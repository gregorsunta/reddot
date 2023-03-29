import { Outlet } from 'react-router-dom';
import Header from '../../components/organisms/Header';
import { useAuthStore } from '../../context/authStoreContext';

const MainLayout = ({ className }) => {
  const authStore = useAuthStore();

  return (
    <div className={className}>
      <Header authStore={authStore} />
      <Outlet />
    </div>
  );
};

export default MainLayout;
