const sleep = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};
export async function fetchPortfolioList() {
  await sleep(1000);
  return {
    "portfolio": [
      {
        asset: 'BTC',
        amount: '$25,000',
        qty: '1',
      },
      {
        asset: 'ETH',
        amount: '$18,000',
        qty: '32',
      },
      {
        asset: 'CARDANO',
        amount: '$16,000',
        qty: '3200',
      },
      {
        asset: 'MATIC',
        amount: '$15,000',
        qty: '4255',
      },
      {
        asset: 'SOL',
        amount: '$20,00',
        qty: '4255',
      },
      {
        asset: 'USD',
        amount: '$20,000',
        qty: '0',
      },
    ],
  };
}
