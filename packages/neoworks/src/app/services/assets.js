import { makeCall } from "./ampClient";

const sleep = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms)); 
  }

  const port = process.env.NX_PORT

  export async function fetchAssetsList(token) {
    await sleep(1000);
  const url = `http://localhost:${port}/v1/assets`;

  try {
    const fetchAssets = await makeCall(token, 'GET', url, '');

    const fetchAssetsResponse = await fetchAssets.json();
    return fetchAssetsResponse;
  } catch (e) {
    return e;
  }
}
    

  