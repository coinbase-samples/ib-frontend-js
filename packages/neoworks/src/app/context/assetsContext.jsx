import React, { useState, useContext, createContext } from 'react';
import { AuthContext } from '../context/authContext';
import _ from 'lodash';
import { fetchAssetsList } from '../services/assets';

const defaultState = {};

export const AssetContext = createContext(defaultState);

const AssetProvider = ({ children }) => {
  const [assets, setAssets] = useState([]);
  const [assetsLoading, setAssetsLoading] = useState(false);
  const { sessionInfo } = useContext(AuthContext);
  const [sorting, setSorting] = useState(false);

  const sortAssets = async (event) => {
    console.log(event);
    let sortedAssets;
    if (assetsLoading) {
      return;
    }
    setAssetsLoading(true);
    setSorting(true);
    const sortedType = event.detail.sortingColumn.sortingField;
    if (sorting) {
      sortedAssets = assets.sort(
        (r, b) => sortedType && Number(b.highOffer) - Number(r.highOffer)
      );
      console.log(sortedAssets);

      setSorting(false);
    } else {
      sortedAssets = assets.sort(
        (r, b) => sortedType && Number(r.highOffer) - Number(b.highOffer)
      );

      setSorting(true);
    }
    setAssets(sortedAssets);
    setAssetsLoading(false);
  };

  const fetchAssets = async () => {
    if (assetsLoading) {
      return;
    }

    setAssetsLoading(true);
    const result = await fetchAssetsList(sessionInfo.accessToken);
    setAssets(result.data);
    setAssetsLoading(false);
  };

  const state = {
    assets,
    fetchAssets,
    assetsLoading,
    sortAssets,
  };

  return (
    <AssetContext.Provider id="assetProvider" value={state}>
      {children}
    </AssetContext.Provider>
  );
};

export default AssetProvider;
