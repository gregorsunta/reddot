import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../../components/organisms/Header';
import rootStore from '../../stores/rootStore';

const MainLayout = ({ className }) => {
  const [userStore] = useState(rootStore.userStore);

  return (
    <div className={className}>
      <Header userStore={userStore} />
      <Outlet />
    </div>
  );
};

export default MainLayout;
