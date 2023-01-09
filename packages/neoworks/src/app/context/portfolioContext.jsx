import { useContext, useState, createContext } from 'react';
import { AuthContext } from '../context/authContext';
import { fetchPortfolioList } from '../services/portfolio';

const defaultState = {};

export const PortfolioContext = createContext(defaultState);

const PortfolioProvider = ({ children }) => {
  const [portfolio, setPortfolio] = useState([]);
  const [portfolioLoading, setPortfolioLoading] = useState(false);
  const { sessionInfo, attrInfo } = useContext(AuthContext);
  const sub = attrInfo.find((a) => a.Name === 'sub')?.Value;
  const fetchPortfolio = async () => {
    if (portfolioLoading) {
      return;
    }

    setPortfolioLoading(true);
    const result = await fetchPortfolioList(sessionInfo.accessToken, sub);
    const fetchedPortfolio = result.sort((r, b) => b.balance - r.balance);
    setPortfolio(fetchedPortfolio);
    setPortfolioLoading(false);
  };

  const state = {
    portfolio,
    fetchPortfolio,
    portfolioLoading,
  };

  return (
    <PortfolioContext.Provider value={state}>
      {children}
    </PortfolioContext.Provider>
  );
};

export default PortfolioProvider;
