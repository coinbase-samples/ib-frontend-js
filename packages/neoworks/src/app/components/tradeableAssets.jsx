import * as React from 'react';
import { Table, Link } from '@cloudscape-design/components';

export function TradeableAssets() {
  return (
    <Table
      variant="container"
      onRowClick={() => console.log('clicked')}
      columnDefinitions={[
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
      items={[
        {
          name: 'btc',
          price: '24000',
          alt: 'btc',
          change: 'up',
          mktCap: '100000000',
          volume: '18.9B',
          supply: '19.0M',
          activity: '100 Buy',
        },
        {
          name: 'Ethereum',
          price: '16000',
          alt: 'eth',
          change: 'up',
          mktCap: '100000000',
          volume: '18.9B',
          supply: '19.0M',
          activity: '100 Buy',
        },
        {
          name: 'Solana',
          price: '24000',
          alt: 'eth',
          change: 'up',
          mktCap: '100000000',
          volume: '18.9B',
          supply: '19.0M',
          activity: '100 Buy',
        },
        {
          name: 'Cardano',
          price: '50',
          alt: 'cardano',
          change: 'up',
          mktCap: '400000',
          volume: '18.9B',
          supply: '19.0M',
          activity: '100 Buy',
        },
        {
          name: 'Matic',
          price: '50',
          alt: 'matic',
          change: 'up',
          mktCap: '50000',
          volume: '18.9B',
          supply: '19.0M',
          activity: '100 Sell',
        },
        {
          name: 'Atom',
          price: '50',
          alt: 'atom',
          change: 'up',
          mktCap: '780000',
          volume: '18.9B',
          supply: '19.0M',
          activity: '100 Buy',
        },
      ]}
    />
  );
}

export default TradeableAssets;
