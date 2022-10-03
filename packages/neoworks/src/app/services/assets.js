import { makeCall } from "./ampClient";
import { baseUrl } from '../../constants';

const sleep = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms)); 
  }

  

  export async function fetchAssetsList(token) {
    await sleep(1000);
  // const url = `${baseUrl}/v1/assets`;

  // try {
  //   const fetchAssets = await makeCall(token, 'GET', url, '');

  //   const fetchAssetsResponse = await fetchAssets.json();
  //   return fetchAssetsResponse;
  // } catch (e) {
  //   return e;
  // }

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
    

  