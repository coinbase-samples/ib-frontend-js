import React, { useState, createContext, useContext } from 'react';
import { AuthContext } from './authContext';
import {
  //this is your imports for services
  fetchAssetsList,
} from '../services/assets';

const defaultState = {};

export const AssetContext = createContext(defaultState);

const AssetProvider = ({ children }) => {
  const { sessionInfo, authStatus } = useContext(AuthContext);
  const [assets, setAssets] = useState([]);
  const [assetsLoading, setAssetsLoading] = useState(false);

  const fetchAssets = async () => {
    if (assetsLoading) {
      return;
    }
    //check authStatus first
    setAssetsLoading(true);
    const result = await fetchAssetsList(sessionInfo.accessToken);
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
