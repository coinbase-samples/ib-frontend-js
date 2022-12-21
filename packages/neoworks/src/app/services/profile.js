import { makeCall } from './ampClient';
import { baseUrl } from '../../constants';

export async function fetchProfile(token, userId) {
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
  const url = `${baseUrl}/v1/profile/${userId}`;

  const payload = JSON.stringify(body);

  try {
    const submitUpdatedProfile = await makeCall(token, 'PUT', url, payload);
    const updatedProfileResponse = await submitUpdatedProfile.response.json();
    return updatedProfileResponse;
  } catch (e) {
    return e;
  }
}

export async function editProfilePhoto() {
  return true;
}
