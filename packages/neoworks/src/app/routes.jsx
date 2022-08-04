import { Routes, Route, HashRouter } from 'react-router-dom';
// eslint-disable-next-line import/no-unresolved
import { Home } from  './pages/Home';
// eslint-disable-next-line import/no-unresolved
import { Trades } from './pages/trades'
// eslint-disable-next-line import/no-unresolved
import { Layout } from './layout';


export const Router = () => (
  <HashRouter>
    <Routes>
      <Route path="/" element={<Layout  />}>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/trades" element={<Trades />} />


  
      </Route>
    </Routes>
  </HashRouter>
);