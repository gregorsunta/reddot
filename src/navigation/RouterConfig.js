import { Route, Routes } from 'react-router-dom';
import Homepage from '../components/pages/Homepage.jsx';

const RouterConfig = () => {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
    </Routes>
  );
};

export default RouterConfig;
