import React, { useState, createContext } from 'react';

import {
  //this is your imports for services
  fetchPortfolioList,
} from '../services/portfolio';

const defaultState = {};

export const PortfolioContext = createContext(defaultState);

const PortfolioProvider = ({ children }) => {
  const [portfolio, setPortfolio] = useState([]);
  const [portfolioLoading, setPortfolioLoading] = useState(false);

  const fetchPortfolio = async () => {
    if (portfolioLoading) {
      return;
    }

    setPortfolioLoading(true);
    const result = await fetchPortfolioList();
    setPortfolio(result.portfolio);
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
