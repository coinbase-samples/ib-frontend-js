import { makeCall } from './ampClient';
import { baseUrl } from '../../constants';

const sleep = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};
export async function fetchPortfolioList(token, sub) {
  await sleep(1000);
  const url = `${baseUrl}/v1/balances/${sub}`;

  try {
    const fetchBalances = await makeCall(token, 'GET', url, '');

    const balanceResponse = await fetchBalances.json();
    const balances = balanceResponse.data.map((o) => {
      //o.available = o.available.slice(0,-13);
      if (o.currency === 'USD') {
        o.available = o.balance;
      }

      return o;
    });
    return balances;
  } catch (e) {
    return e;
  }
}
