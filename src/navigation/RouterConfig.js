import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { observer } from 'mobx-react';
import { useRoot } from '../context/rootStoreContext';
import HomePage from '../components/pages/HomePage';
import SubmitPage from '../components/pages/SubmitPage';
import LoginPage from '../components/pages/LoginPage';
import RegisterPage from '../components/pages/RegisterPage';
import MainLayout from './layouts/MainLayout.jsx';

const RouterConfig = observer(() => {
  const rootStore = useRoot();
  const [isSignedIn] = useState(!!rootStore);
  return (
    <>
      <Routes>
        <Route path="/" element={<MainLayout isSignedIn={isSignedIn} />}>
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
