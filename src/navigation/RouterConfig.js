import { Route, Routes } from 'react-router-dom';
import Home from '../components/pages/Home';
import Submit from '../components/pages/Submit';
import Header from '../components/organisms/Header';
import { PageInfoPanel } from '../components/molecules/panels';

//TODO: make template references only directly on pages?

const RouterConfig = () => {
  return (
    <div>
      <Header className={`${''}`}></Header>
      <div className={`${''}`}>
        <Routes>
          <Route path="/" element={<Home className={`${''}`} />} />
          <Route path="/submit" element={<Submit className={`${''}`} />} />
        </Routes>
      </div>
    </div>
  );
};

export { RouterConfig };
