import { makeCall } from "./ampClient";

const sleep = (ms) => {
  return new Promise(resolve => setTimeout(resolve, ms)); 
}

export async function fetchProfile(userId) {
  await sleep(1000);
  const url = 'http://localhost:3001/v1/profile/1';
  const path = '/v1/profile/1';

  try {
    const fetchProfile = await makeCall('GET', url, path, '');

    const profileResponse = await fetchProfile.json();
    return profileResponse;
  } catch (e) {
    return e;
  }
}

export async function updateProfile() {
  console.log('updated profile')
} 

export async function editProfilePhoto() {
  console.log('Photo Updated')
} 