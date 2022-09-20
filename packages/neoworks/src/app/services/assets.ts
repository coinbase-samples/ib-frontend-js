import { Api } from '../../clients/assetApi';

export async function fetchAssetsList(authToken: string) {
  const api = new Api({
    baseUrl: 'http://localhost:8443',
    baseApiParams: {
      headers: { Authorization: 'Bearer ' + authToken },
    },
  });
  const response = await api.v1.assetServiceListAssets();
  console.log('fetched assets', response);
  return response;
  return {
    assets: [
      {
        name: 'BTC',
        price: 24000,
        alt: 'BTC',
        change: 'up',
        mktCap: '100000000',
        volume: '18.9B',
        supply: '19.0M',
        activity: '100 Buy',
      },
      {
        name: 'ETH',
        price: 16000,
        alt: 'eth',
        change: 'up',
        mktCap: '100000000',
        volume: '18.9B',
        supply: '19.0M',
        activity: '100 Buy',
      },
      {
        name: 'SOL',
        price: 100,
        alt: 'SOL',
        change: 'up',
        mktCap: '100000000',
        volume: '18.9B',
        supply: '19.0M',
        activity: '100 Buy',
      },
      {
        name: 'CARDANO',
        price: 1.5,
        alt: 'cardano',
        change: 'up',
        mktCap: '400000',
        volume: '18.9B',
        supply: '19.0M',
        activity: '100 Buy',
      },
      {
        name: 'MATIC',
        price: 50,
        alt: 'matic',
        change: 'up',
        mktCap: '50000',
        volume: '18.9B',
        supply: '19.0M',
        activity: '100 Sell',
      },
      {
        name: 'ATOM',
        price: 5,
        alt: 'atom',
        change: 'up',
        mktCap: '780000',
        volume: '18.9B',
        supply: '19.0M',
        activity: '100 Buy',
      },
    ],
  };
}
