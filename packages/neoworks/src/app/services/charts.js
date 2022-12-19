import { exchangeHost } from '../../constants';

const sleep = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

export async function fetchAssetChart(asset, apiStart, apiEnd) {
  await sleep(1000);
  const url = `${exchangeHost}/${asset}-USD/candles?start=${apiStart}&end=${apiEnd}&granularity=3600`;

  try {
    const assetChart = await fetch(url, {
      mode: 'cors',
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const fetchAssetChartsResponse = await assetChart.json();
    const newArr = fetchAssetChartsResponse.map((data) => ({
      asset,
      x: new Date(data[0] * 1000),
      y: data[4],
    }));

    return newArr;
  } catch (e) {
    return e;
  }
}
