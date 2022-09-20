const sleep = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms)); 
  }
  export async function fetchAssetsList() {
    await sleep(1000);
    return {
      "assets":[
        {
            name: 'BTC_USD',
            price: 24000,
            alt: 'BTC',
            change: 'up',
            mktCap: '100000000',
            volume: '18.9B',
            supply: '19.0M',
            activity: '100 Buy',
          },
          {
            name: 'ETH_USD',
            price: 16000,
            alt: 'eth',
            change: 'up',
            mktCap: '100000000',
            volume: '18.9B',
            supply: '19.0M',
            activity: '100 Buy',
          },
          {
            name: 'SOL_USD',
            price: 100,
            alt: 'SOL',
            change: 'up',
            mktCap: '100000000',
            volume: '18.9B',
            supply: '19.0M',
            activity: '100 Buy',
          },
          {
            name: 'ADA_USD',
            price: 1.50,
            alt: 'cardano',
            change: 'up',
            mktCap: '400000',
            volume: '18.9B',
            supply: '19.0M',
            activity: '100 Buy',
          },
          {
            name: 'MATIC_USD',
            price: 50,
            alt: 'matic',
            change: 'up',
            mktCap: '50000',
            volume: '18.9B',
            supply: '19.0M',
            activity: '100 Sell',
          },
          {
            name: 'ATOM_USD',
            price: 5,
            alt: 'atom',
            change: 'up',
            mktCap: '780000',
            volume: '18.9B',
            supply: '19.0M',
            activity: '100 Buy',
          }
      ]
      }}
    

  