import { makeCall } from "./ampClient";

const sleep = (ms) => {
  return new Promise(resolve => setTimeout(resolve, ms)); 
}

export async function fetchProfile(token, userId) {
  await sleep(1000);
  const url = `http://localhost:8443/v1/profile/${userId}`;

  try {
    const fetchProfile = await makeCall(token, 'GET', url, '');

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