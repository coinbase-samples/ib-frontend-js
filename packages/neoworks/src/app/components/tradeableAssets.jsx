import * as React from 'react';
import { Table, Link } from '@cloudscape-design/components';
import { AssetContext } from '../context/assetsContext';
import { useContext, useEffect } from 'react';
import { Icons } from '../utils/Icons';

export function TradeableAssets() {
  const {
    assets,
    assetsLoading: assetsLoaded,
    fetchAssets,
  } = useContext(AssetContext);

  useEffect(() => {
    if (!assetsLoaded && assets?.length === 0) {
      fetchAssets();
    }
  }, [assets, assetsLoaded, fetchAssets]);

  return (
    <Table
      variant="container"
      columnDefinitions={[
        {
          id: 'icon',
          header: '',
          cell: (e) => <Icons asset={e.name} />,
          width: 100,
          minWidth: 100,
        },
        {
          id: 'name',
          header: 'Name',
          cell: (e) => <Link href={`#/assets/${e.name}`}>{e.name}</Link>,
          width: 100,
          minWidth: 100,
          sortingField: 'name',
        },
        {
          id: 'price',
          header: 'Price',
          cell: (e) => e.price,
          width: 90,
          minWidth: 90,
        },
        {
          id: 'change',
          header: 'Change',
          cell: (e) => e.change,
          width: 110,
          minWidth: 90,
        },
        {
          id: 'mktCap',
          header: 'Mkt Cap',
          cell: (e) => e.mktCap,
          width: 50,
          minWidth: 50,
          sortingField: 'mktCap',
        },
        {
          id: 'activity',
          header: 'Activity',
          cell: (e) => e.activity,
          width: 150,
          minWidth: 150,
          sortingField: 'activity',
        },
        {
          id: 'trade',
          header: '',
          cell: (e) => <Link href={`#/assets/${e.name}`}>Trade</Link>,
          width: 170,
          minWidth: 170,
        },
      ]}
      items={assets.assets}
      loading={assetsLoaded}
      loadingText="Loading Assets"
    />
  );
}

export default TradeableAssets;
