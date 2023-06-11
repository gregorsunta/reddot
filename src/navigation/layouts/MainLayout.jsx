import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../../components/organisms/Header';
import { useStores } from '../../context/authStoreContext';

const MainLayout = ({ className }) => {
  const authStore = useStores();

  return (
    <div className={className}>
      <Header authStore={authStore} />
      <Outlet />
    </div>
  );
};

export default MainLayout;
