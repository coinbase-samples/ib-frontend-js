const sleep = (ms) => {
  return new Promise(resolve => setTimeout(resolve, ms)); 
}

export async function fetchProfile(userId) {
  await sleep(1000);
  return {
    userId,
    name: 'Jay Parisi',
    email: 'jay.parisi@coinbase.com',
    roles: ['user', 'admin'],
    username: 'jprix',
    address: '123 Happy Canyon Way, Denver',
    legalName: 'Jay Parisi',
    dateOfBirth: '1/23/2001'
  }
}
