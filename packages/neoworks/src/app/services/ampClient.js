
export const makeCall = async (method, url, path, body) => {
//   const signature = await getSignature(method, path, body);
  const headers = {
    Accept: 'application/json',
    Authorization: 'Bearer eyJraWQiOiJxVzZWNFNNK3NGM3UzTExhZFwvMjZkdldVWFdrVmRjVzE2cXhHOXVPNDlLMD0iLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiI0ZjVhNjMzNi04MTAxLTQ2MzQtYTQ1OC03M2I3ZjZmY2Y0OWYiLCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAudXMtZWFzdC0yLmFtYXpvbmF3cy5jb21cL3VzLWVhc3QtMl9DdDUycDQ0bTkiLCJjbGllbnRfaWQiOiIzcmE1NzlmNGxsZmIyYmMwOWxpNGswZjBpNyIsIm9yaWdpbl9qdGkiOiI4ZDQyYTkwNS1jZTE5LTQzNzctODFlOS1mY2ZhYWVjMTRkNDMiLCJldmVudF9pZCI6IjVjMjViYTY5LTNhYmYtNDk2NS05NjU0LWU3YmZhODA5OGM4MyIsInRva2VuX3VzZSI6ImFjY2VzcyIsInNjb3BlIjoiYXdzLmNvZ25pdG8uc2lnbmluLnVzZXIuYWRtaW4iLCJhdXRoX3RpbWUiOjE2NjE0NTI1ODUsImV4cCI6MTY2MTQ1NjE4NSwiaWF0IjoxNjYxNDUyNTg1LCJqdGkiOiI0OGNiOGJlMS1jODBkLTQzNjgtYjEwZC0yN2Y0NmIzOWYyNjYiLCJ1c2VybmFtZSI6ImpheS5wcml4In0.vVJyAqyEdgdAnsM9UWgQTcR3z-wzZZVgbzQG0w-j48mJZqrubG6wMRfSzycVmM7iRZKAzhTio8eJ2qcPbuIWocFmS7_1YDFD2UwWoIDG-wrI5KItP6EBoKeVSX2hJ5dcGXqN0t6p0XxljBhfalDis1nRDWjthYpT0egGN5T9XkARju-5boVHjRFPqlhdPxX5aNGAUFH2VuHn5Ig-mjbH4eIsi-5I7a4mMJlEw1kpIsMQldh9l0YAzCkBn3Wmqq3jc6CrIGk985O_uZhyJc-5bwAngk8b-Nah2UgU5w0WzZBKh-9AXEebHE7j79hwoM0BHSx5W86nVtGpAJ48PvFQWQ',
    'Content-Type': 'application/json',
    
  };
  try {
    if (body) {
      const callAmp = await fetch(url, {
        credentials: 'include',
        mode: 'cors',
        method,
        body,
        withCredentials: true,
        headers,
      });
      return callAmp;
    } else {
      console.log('else hit')
      const callAmp = await fetch(url, {
        credentials: 'include',
        mode: 'cors',
        method,
        withCredentials: true,
        headers,
      });

      return callAmp;
    }
  } catch (e) {
    return e;
  }
};