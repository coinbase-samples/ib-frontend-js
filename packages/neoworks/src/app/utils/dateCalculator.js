import _ from 'lodash';

export const dateCalculator = (assetChart) => {
  const now = Date.now();

  const endDate = new Date(now);
  const startDate = new Date(endDate.getTime() - 5 * 24 * 60 * 60 * 1000);
  const apiStart = startDate.getTime();
  const apiEnd = endDate.getTime();
  const start = _.first(assetChart);
  const end = assetChart.pop();

  return {
    apiStart,
    apiEnd,
    start,
    end,
  };
};
