export const dateCalculator = (assetChart) => {
  const now = Date.now();

  const endDate = new Date(now);
  const startDate = new Date(endDate.getTime() - 5 * 24 * 60 * 60 * 1000);
  const xStart = startDate.getTime();
  const xEnd = endDate.getTime();

  const yStart = assetChart[0];
  const yEnd = assetChart.pop();

  return {
    xStart,
    xEnd,
    yStart,
    yEnd,
    endDate,
    startDate,
  };
};
