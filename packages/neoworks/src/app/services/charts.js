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
      // const example = [
      //   { x: new Date(1601006400000), y: 58020 },
      //   { x: new Date(1601007300000), y: 102402 },
      //   { x: new Date(1601008200000), y: 104920 },
      //   { x: new Date(1601009100000), y: 94031 },
      //   { x: new Date(1601010000000), y: 125021 },
      //   { x: new Date(1601010900000), y: 159219 },
      //   { x: new Date(1601011800000), y: 193082 },
      //   { x: new Date(1601012700000), y: 162592 },
      //   { x: new Date(1601013600000), y: 274021 },
      //   { x: new Date(1601014500000), y: 264286 },
      //   { x: new Date(1601015400000), y: 289210 },
      //   { x: new Date(1601016300000), y: 256362 },
      //   { x: new Date(1601017200000), y: 257306 },
      //   { x: new Date(1601018100000), y: 186776 },
      //   { x: new Date(1601019000000), y: 294020 },
      //   { x: new Date(1601019900000), y: 385975 },
      //   { x: new Date(1601020800000), y: 486039 },
      //   { x: new Date(1601021700000), y: 490447 },
      //   { x: new Date(1601022600000), y: 361845 },
      //   { x: new Date(1601023500000), y: 339058 },
      //   { x: new Date(1601024400000), y: 298028 },
      //   { x: new Date(1601025300000), y: 231902 },
      //   { x: new Date(1601026200000), y: 224558 },
      //   { x: new Date(1601027100000), y: 253901 },
      //   { x: new Date(1601028000000), y: 102839 },
      //   { x: new Date(1601028900000), y: 234943 },
      //   { x: new Date(1601029800000), y: 204405 },
      //   { x: new Date(1601030700000), y: 190391 },
      //   { x: new Date(1601031600000), y: 183570 },
      //   { x: new Date(1601032500000), y: 162592 },
      //   { x: new Date(1601033400000), y: 148910 },
      //   { x: new Date(1601034300000), y: 229492 },
      //   { x: new Date(1665450000), y: 293910 }
      // ]
      // console.log(new Date(1665450000))
      //returns Tue Jan 20 1970 01:37:30 GMT-0500

      // mine   'Mon Oct 10 2022 22:26:33 GMT-0400 (Eastern Daylight Time)'
    const fetchAssetChartsResponse = await assetChart.json();
      const newArr = fetchAssetChartsResponse.map(data => (
        { x: new Date(data[0] * 1000), y: data[1] }));
        
      
      console.log(newArr)
      
    return newArr;
  } catch (e) {
    return e;
  }

  };


  