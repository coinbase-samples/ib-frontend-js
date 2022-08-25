



export const makeCall = async (token, method, url, body) => {

  

//   const signature = await getSignature(method, path, body);
  const headers = {
    Accept: 'application/json',
    Authorization: token,
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