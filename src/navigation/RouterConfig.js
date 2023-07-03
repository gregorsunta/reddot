import { Route, Routes, Navigate } from 'react-router-dom';
import { observer } from 'mobx-react';
import MainLayout from './layouts/MainLayout.jsx';
import HomePage from '../components/pages/HomePage';
import SubmitPage from '../components/pages/SubmitPage';
import LoginPage from '../components/pages/LoginPage';
import RegisterPage from '../components/pages/RegisterPage';
import { useStores } from '../context/authStoreContext.js';
import { PostPage } from '../components/pages/PostPage.jsx';
import { toJS } from 'mobx';

const RouterConfig = observer(() => {
  const { contentStore } = useStores();
  const user = toJS(contentStore.user);
  return (
    <>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route
            path="submit"
            element={user ? <SubmitPage /> : <Navigate to={'/login'} />}
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
