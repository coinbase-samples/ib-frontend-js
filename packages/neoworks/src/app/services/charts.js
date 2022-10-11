import { makeCall } from "./ampClient";
// import { baseUrl } from '../../constants';

const sleep = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms)); 
  }

  

  export async function fetchAssetChart(asset, startDate, endDate) {
    await sleep(1000);
  const url = `https://api.exchange.coinbase.com/products/${asset}-USD/candles?start=1665019709023&end=1665451709023&granularity=3600`;

  try {
    const assetChart = await await fetch(url, {
        mode: 'cors',
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
      });
     
      //   { x: new Date(1601006400000), y: 58020 },
      // ]
      // console.log(new Date(1665450000))
      
    const fetchAssetChartsResponse = await assetChart.json();
      const newArr = fetchAssetChartsResponse.map(data => (
        { 
          asset,
          x: new Date(data[0] * 1000), y: data[1] 
        }));
        
      
      console.log(newArr)
      
    return newArr;
  } catch (e) {
    return e;
  }

  };


  