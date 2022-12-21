import { makeCall } from './ampClient';
import { baseUrl } from '../../constants';

export async function fetchAssetsList(token) {
  const url = `${baseUrl}/v1/assets`;

  try {
    const fetchAssets = await makeCall(token, 'GET', url, '');

    const fetchAssetsResponse = await fetchAssets.json();
    return fetchAssetsResponse;
  } catch (e) {
    return e;
  }
}
