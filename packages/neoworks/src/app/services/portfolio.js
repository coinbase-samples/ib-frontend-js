import { makeCall } from "./ampClient";
import { baseUrl } from '../../constants';

const sleep = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};
export async function fetchPortfolioList(token) {
  await sleep(1000);
  const url = `${baseUrl}/v1/balances/4f5a6336-8101-4634-a458-73b7f6fcf49f`;

  try {
    const fetchProfile = await makeCall(token, 'GET', url, '');

    const profileResponse = await fetchProfile.json();
    return profileResponse.data;
  } catch (e) {
    return e;
  }
}


