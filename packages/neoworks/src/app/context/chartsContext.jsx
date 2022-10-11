import React, { useState, createContext } from 'react';
import { fetchAssetChart } from '../services/charts';

const defaultState = {};

export const ChartContext = createContext(defaultState);

const ChartProvider = ({ children }) => {
  const [assetChart, setAssetChart] = useState([]);
  const [assetChartLoading, setAssetChartLoading] = useState(false);

  const fetchChart = async (asset, startDate, endDate) => {
    if (assetChartLoading) {
      return;
    }

    setAssetChartLoading(true);
    console.log('about to call asset chart');
    const result = await fetchAssetChart(asset);
    setAssetChart(result);
    setAssetChartLoading(false);
  };

  const state = {
    fetchChart,
    assetChart,
    assetChartLoading,
  };

  return (
    <ChartContext.Provider value={state}>{children}</ChartContext.Provider>
  );
};

export default ChartProvider;
