import { makeCall } from "./ampClient";
import { baseUrl } from '../../constants';


const sleep = (ms) => {
  return new Promise(resolve => setTimeout(resolve, ms)); 
}

export async function fetchProfile(token, userId) {

  await sleep(1000);
  const url = `${baseUrl}/v1/profile/${userId}`;

  try {
    const fetchProfile = await makeCall(token, 'GET', url, '');

    const profileResponse = await fetchProfile.json();
    return profileResponse;
  } catch (e) {
    return e;
  }
}

export async function updateProfile(token, body, userId) {
  await sleep(1000);
        const url = `http://${baseUrl}/v1/profile/${userId}`;

        const payload = JSON.stringify(body)

    try {
      const submitUpdatedProfile = await makeCall(token, 'PUT', url, payload);

      const UpdatedProfileResponse = await submitUpdatedProfile.json();
      return UpdatedProfileResponse;
    } catch (e) {
      return e;
    }
  }

export async function editProfilePhoto() {
  console.log('Photo Updated')
} 