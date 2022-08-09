import { Routes, Route, HashRouter } from 'react-router-dom';
// eslint-disable-next-line import/no-unresolved
import { Home } from './pages/Home';
// eslint-disable-next-line import/no-unresolved
import { Trades } from './pages/trades';
// eslint-disable-next-line import/no-unresolved
import { Layout } from './layout';
import Profile from './components/profiles';
import Activity from './pages/activity';
import AssetId from './pages/assetId';
import OrderId from './pages/OrderId';
import { LoginModal } from './components/loginModal';

export const Router = () => (
  <HashRouter>
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/trades" element={<Trades />} />
        <Route path="/modal" element={<LoginModal />} />

        <Route path="/assets/:asset" element={<AssetId />} />

        <Route path="/profile" element={<Profile />} />
        <Route path="/activity" element={<Activity />} />
        <Route path="/activity/orders/:orderId" element={<OrderId />} />
      </Route>
    </Routes>
  </HashRouter>
);
