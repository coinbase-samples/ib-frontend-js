import React, { useState, createContext } from 'react';

import {
  //this is your imports for services
  fetchAssetsList,
} from '../services/assets';

const defaultState = {};

export const AssetContext = createContext(defaultState);

const AssetProvider = ({ children }) => {
  const [assets, setAssets] = useState([]);
  const [assetsLoading, setAssetsLoading] = useState(false);

  const fetchAssets = async () => {
    if (assetsLoading) {
      return;
    }

    setAssetsLoading(true);
    const result = await fetchAssetsList();
    setAssets(result);
    setAssetsLoading(false);
  };

  const state = {
    assets,
    fetchAssets,
    assetsLoading,
  };

  return (
    <AssetContext.Provider value={state}>{children}</AssetContext.Provider>
  );
};

export default AssetProvider;
