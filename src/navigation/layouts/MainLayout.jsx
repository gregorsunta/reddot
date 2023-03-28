import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../../components/organisms/Header';
import AuthStore from '../../stores/authStore';

const MainLayout = ({ className }) => {
  const [userStore] = useState(AuthStore);

  return (
    <div className={className}>
      <Header userStore={userStore} />
      <Outlet />
    </div>
  );
};

export default MainLayout;
