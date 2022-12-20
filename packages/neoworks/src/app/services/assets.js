import { makeCall } from './ampClient';
import { baseUrl } from '../../constants';

const sleep = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

export async function fetchAssetsList(token) {
  await sleep(1000);
  const url = `${baseUrl}/v1/assets`;

  try {
    const fetchAssets = await makeCall(token, 'GET', url, '');

    const fetchAssetsResponse = await fetchAssets.json();
    console.log(fetchAssetsResponse);
    return fetchAssetsResponse;
  } catch (e) {
    return e;
  }
}
