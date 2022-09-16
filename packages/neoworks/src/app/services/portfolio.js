import { makeCall } from "./ampClient";

const sleep = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};
export async function fetchPortfolioList(token) {
  await sleep(1000);
  const url = 'http://localhost:8442/v1/balances/620E62FD-DAF1-4738-84CE-1DBC4393ED29';

  try {
    const fetchProfile = await makeCall(token, 'GET', url, '');

    const profileResponse = await fetchProfile.json();
    return profileResponse.data;
  } catch (e) {
    return e;
  }
}


