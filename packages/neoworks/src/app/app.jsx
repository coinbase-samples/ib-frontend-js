import { useContext } from 'react';
import AuthProvider, { AuthContext } from './context/authContext';
import ProfileProvider from './context/profileContext';
import AssetProvider from './context/assetsContext';
import PortfolioProvider from './context/portfolioContext';
import OrderProvider from './context/ordersContext';
import WebsocketProvider from './context/websocketContext.jsx';
import { Router } from './routes';

const InsideAuth = ({ children }) => {
  const { sessionInfo } = useContext(AuthContext);
  return (
    <ProfileProvider userId={sessionInfo?.email}>
      <WebsocketProvider>
        <PortfolioProvider>
          <AssetProvider>
            <OrderProvider>
              <Router />
            </OrderProvider>
          </AssetProvider>
        </PortfolioProvider>
      </WebsocketProvider>
    </ProfileProvider>
  );
};

export function App() {
  return (
    <AuthProvider>
      <InsideAuth />
    </AuthProvider>
  );
}

export default App;
