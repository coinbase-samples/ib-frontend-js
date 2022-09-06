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

export async function updateProfile(token, body, userId) {
  await sleep(1000);
        const url = `http://localhost:8443/v1/profile/${userId}`;

        const payload = JSON.stringify(body)

    try {
      const submitUpdatedProfile = await makeCall(token, 'POST', url, payload);

      const UpdatedProfileResponse = await submitUpdatedProfile.json();
      console.log(UpdatedProfileResponse)
      return UpdatedProfileResponse;
    } catch (e) {
      return e;
    }
  }

export async function editProfilePhoto() {
  console.log('Photo Updated')
} 