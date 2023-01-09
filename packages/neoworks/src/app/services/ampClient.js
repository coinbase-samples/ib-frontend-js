export const makeCall = async (token, method, url, body) => {
  const headers = {
    Accept: 'application/json',
    Authorization: 'Bearer ' + token,
    'Content-Type': 'application/json',
  };
  try {
    if (body) {
      const callAmp = await fetch(url, {
        mode: 'cors',
        method,
        body,
        headers,
      });
      return {
        httpStatus: `${callAmp.status}`,
        response: callAmp,
      };
    } else {
      const callAmp = await fetch(url, {
        mode: 'cors',
        method,
        headers,
      });

      return callAmp;
    }
  } catch (e) {
    return e;
  }
};
