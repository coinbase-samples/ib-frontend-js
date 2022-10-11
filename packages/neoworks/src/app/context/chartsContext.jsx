import React, { useState, createContext } from 'react';
import { fetchAssetChart } from '../services/charts';

const defaultState = {};

export const ChartContext = createContext(defaultState);

const ChartProvider = ({ children }) => {
  const [assetChart, setAssetChart] = useState([]);
  const [assetChartLoading, setAssetChartLoading] = useState(false);

  const fetchChartByAsset = async (asset, startDate, endDate) => {
    if (assetChartLoading) {
      return;
    }
    setAssetChartLoading(true);

    const result = await fetchAssetChart(asset);

    setAssetChart(result);
    setAssetChartLoading(false);
  };

  const state = {
    fetchChartByAsset,
    assetChart,
    assetChartLoading,
  };

  return (
    <ChartContext.Provider value={state}>{children}</ChartContext.Provider>
  );
};

export default ChartProvider;
