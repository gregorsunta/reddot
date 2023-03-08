import { Route, Routes } from 'react-router-dom';
import LoginPage from '../components/pages/LoginPage';
import HomePage from '../components/pages/HomePage';
import SubmitPage from '../components/pages/SubmitPage';
import Header from '../components/organisms/Header';
import RegisterPage from '../components/pages/RegisterPage';
import { observer } from 'mobx-react';
import { useAuth } from '../context/authContext';

const RouterConfig = observer(() => {
  const AuthStore = useAuth();
  return (
    <div>
      <Header className={`${''}`}></Header>
      <div className={`${''}`}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/submit"
            element={AuthStore.user ? <SubmitPage /> : <LoginPage />}
          />
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/register"
            element={<RegisterPage className={`${''}`} />}
          />
        </Routes>
      </div>
    </div>
  );
});

export { RouterConfig };
