import { Route, Routes, Navigate } from 'react-router-dom';
import { observer } from 'mobx-react';
import MainLayout from './layouts/MainLayout.jsx';
import HomePage from '../components/pages/HomePage';
import SubmitPage from '../components/pages/SubmitPage';
import LoginPage from '../components/pages/LoginPage';
import RegisterPage from '../components/pages/RegisterPage';
import { useAuthStore } from '../context/authStoreContext.js';
import { PostPage } from '../components/pages/PostPage.jsx';

const RouterConfig = observer(() => {
  const authStore = useAuthStore();
  return (
    <>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route
            path="submit"
            element={
              authStore.user ? <SubmitPage /> : <Navigate to={'/login'} />
            }
          />
          <Route path={'login'} element={<LoginPage />} />
          <Route path={'signup'} element={<RegisterPage />} />
          <Route path={'post/:postId'} element={<PostPage />} />
        </Route>
      </Routes>
    </>
  );
});

export { RouterConfig };
