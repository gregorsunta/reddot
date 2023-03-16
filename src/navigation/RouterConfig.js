import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { observer } from 'mobx-react';
import { useRoot } from '../context/rootStoreContext';
import MainLayout from './layouts/MainLayout.jsx';
import HomePage from '../components/pages/HomePage';
import SubmitPage from '../components/pages/SubmitPage';
import LoginPage from '../components/pages/LoginPage';
import RegisterPage from '../components/pages/RegisterPage';

const RouterConfig = observer(() => {
  return (
    <>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path="submit" element={<SubmitPage />} />
        </Route>
        <Route path={'/login'} element={<LoginPage />} />
        <Route path={'/signup'} element={<RegisterPage />} />
      </Routes>
    </>
  );
});

export { RouterConfig };
