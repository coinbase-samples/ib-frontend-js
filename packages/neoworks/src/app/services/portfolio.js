import { makeCall } from "./ampClient";
import { baseUrl } from '../../constants';

const sleep = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};
export async function fetchPortfolioList(token) {
  await sleep(1000);
  const url = `${baseUrl}/v1/balances/c5af3271-7185-4a52-9d0c-1c4b418317d8
  `;

  try {
    const fetchProfile = await makeCall(token, 'GET', url, '');

    const profileResponse = await fetchProfile.json();
    return profileResponse.data;
  } catch (e) {
    return e;
  }
}


