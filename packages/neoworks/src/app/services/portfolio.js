import { makeCall } from "./ampClient";
import { baseUrl } from '../../constants';

const sleep = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};
export async function fetchPortfolioList(token, sub) {
  await sleep(1000);
  const url = `${baseUrl}/v1/balances/${sub}
  `;

  try {
    const fetchProfile = await makeCall(token, 'GET', url, '');

    const profileResponse = await fetchProfile.json();
    const balances = profileResponse.data.map(o => {
      o.available = o.available.slice(0,-13);
      if(o.currency === 'USD'){
        o.available = o.balance
      }
    
      return o;
    //return profileResponse.data;
  })
  return balances
 } catch (e) {
    return e;
  }
}


