import { Route, Routes } from 'react-router-dom';
import LoginPage from '../components/pages/LoginPage';
import HomePage from '../components/pages/HomePage';
import SubmitPage from '../components/pages/SubmitPage';
import Header from '../components/organisms/Header';
import RegisterPage from '../components/pages/RegisterPage';

const RouterConfig = ({ store }) => {
  return (
    <div>
      <Header className={`${''}`}></Header>
      <div className={`${''}`}>
        <Routes>
          <Route path="/" element={<HomePage className={`${''}`} />} />
          <Route path="/submit" element={<SubmitPage className={`${''}`} />} />
          <Route path="/login" element={<LoginPage className={`${''}`} />} />
          <Route
            path="/register"
            element={<RegisterPage className={`${''}`} />}
          />
        </Routes>
      </div>
    </div>
  );
};

export { RouterConfig };
