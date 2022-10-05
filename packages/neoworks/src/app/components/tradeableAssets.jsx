import * as React from 'react';
import { Table, Link } from '@cloudscape-design/components';
import { AssetContext } from '../context/assetsContext';
import { WebsocketContext } from '../context/websocketContext';

import { useContext, useEffect } from 'react';
import { Icons } from '../utils/Icons';

export function TradeableAssets() {
  const {
    assets,
    sortAssets,
    assetsLoading: assetsLoaded,
    fetchAssets,
  } = useContext(AssetContext);

  const { assetFeed, connected } = useContext(WebsocketContext);
  console.log(assetFeed, connected);
  useEffect(() => {
    if (!assetsLoaded && assets?.length === 0) {
      fetchAssets();
    }
  }, [assets, assetsLoaded, fetchAssets]);

  const handleSort = (event) => {
    sortAssets(event);
  };

  return (
    <Table
      resizableColumns={true}
      trackBy="name"
      sortingDescending
      onSortingChange={handleSort}
      variant="container"
      columnDefinitions={[
        {
          id: 'icon',
          header: '',
          cell: (e) => <Icons asset={e.ticker} />,
          width: 100,
          minWidth: 100,
        },
        {
          id: 'name',
          header: 'Name',
          cell: (e) => <Link href={`#/assets/${e.ticker}`}>{e.name}</Link>,
          width: 100,
          minWidth: 100,
        },
        {
          id: 'price',
          header: 'Price',
          cell: (e) => e.lowBid,
          width: 130,
          minWidth: 130,
          sortingField: 'price',
        },
        {
          id: 'volume',
          header: 'Volume',
          cell: (e) => e.volume,
          width: 135,
          minWidth: 135,
          sortingField: 'volume',
        },
        {
          id: 'marketCap',
          header: 'Market Cap',
          cell: (e) => e.marketCap,
          width: 150,
          minWidth: 150,
          sortingField: 'marketCap',
        },
        {
          id: 'direction',
          header: 'Direction',
          cell: (e) => e.direction,
          width: 110,
          minWidth: 110,
          sortingField: 'direction',
        },
        {
          id: 'supply',
          header: 'Supply',
          cell: (e) => e.supply,
          width: 110,
          minWidth: 90,
        },
        {
          id: 'trade',
          header: '',
          cell: (e) => <Link href={`#/assets/${e.name}`}>Trade</Link>,
          width: 170,
          minWidth: 170,
        },
      ]}
      items={assetFeed}
      loading={assetsLoaded}
      loadingText="Loading Assets"
    />
  );
}

export default TradeableAssets;
