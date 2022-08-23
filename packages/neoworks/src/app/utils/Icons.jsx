import * as React from 'react';
import {
  Cosmos,
  Solana,
  Bitcoin,
  Ethereum,
  Cardano,
  Polygon,
} from 'cryptocons';

export const Icons = ({ asset }) => {
  switch (asset) {
    case 'BTC':
      return <Bitcoin height="45px" width="45px" />;
    case 'BTC-USD':
      return <Bitcoin height="45px" width="45px" />;
    case 'ETH':
      return <Ethereum height="45px" width="45px" />;
    case 'ETH-USD':
      return <Ethereum height="45px" width="45px" />;
    case 'Ethereum':
      return <Ethereum height="45px" width="45px" />;
    case 'SOL':
      return <Solana height="45px" width="45px" />;
    case 'SOL-USD':
      return <Solana height="45px" width="45px" />;
    case 'Solana':
      return <Solana height="45px" width="45px" />;
    case 'Matic':
      return <Polygon height="45px" width="45px" />;
    case 'Cardano':
      return <Cardano height="45px" width="45px" />;
    case 'Atom':
      return <Cosmos height="45px" width="45px" />;
    case 'MATIC':
      return <Polygon height="45px" width="45px" />;
    case 'CARDANO':
      return <Cardano height="45px" width="45px" />;
    case 'ATOM':
      return <Cosmos height="45px" width="45px" />;
    default:
      return;
  }
};
