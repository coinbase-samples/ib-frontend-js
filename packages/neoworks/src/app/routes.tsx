import { useContext } from 'react';
import { Routes, Route, HashRouter } from 'react-router-dom';

import { Layout } from './layout';
import { AuthContext, AuthStatus } from './context/authContext';

import { Home } from './pages/home';
import { Trades } from './pages/trades';
import { Profile } from './components/profiles';
import { Activity } from './pages/activity';
import { AssetId } from './pages/assetId';
import { OrderId } from './pages/orderId';
import { Landing } from './pages/landing';
import { Portfolio } from './pages/portfolio';


export const Router = () => {
  const { authStatus } = useContext(AuthContext);
  return (
    <HashRouter>
      <Routes>
        {authStatus === AuthStatus.SignedIn ? (
          <Route path="/" element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/trades" element={<Trades />} />
            <Route path="/assets/:asset" element={<AssetId />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/activity" element={<Activity />} />
            <Route path="/activity/orders/:orderId" element={<OrderId />} />
          </Route>
        ) : authStatus === AuthStatus.Loading ? (
          <div>loading...</div>
        ) : (
          <>
          <Route path="/" element={<Landing />} />
          <Route path="/signin" element={<Landing />} />
          </>
        )}
      </Routes>
    </HashRouter>
  );
};
