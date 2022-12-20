import * as React from 'react';
import { LineChart, Box, Button } from '@cloudscape-design/components';
import { ChartContext } from '../../context/chartsContext';

import { useContext, useEffect } from 'react';
import { dateCalculator } from '../../utils/dateCalculator';

export function PortfolioChart() {
  const { assetChart, assetChartLoading, fetchChartByAsset } =
    useContext(ChartContext);

  const [yStart, setYStart] = React.useState(0);
  const [yEnd, setYEnd] = React.useState(1000);
  const [startDate, setStartDate] = React.useState('');
  const [endDate, setEndDate] = React.useState('');

  const asset = 'ETH';
  const currentAssetChart = asset;

  useEffect(() => {
    const chartData = dateCalculator(assetChart);
    setStartDate(chartData.startDate);
    setEndDate(chartData.endDate);

    if (!assetChart.length && !assetChartLoading) {
      fetchChartByAsset(asset, chartData.apiStart, chartData.apiEnd);

      setYStart(chartData.start?.y);
      setYEnd(chartData.end?.y);
    } else if (assetChart[0].asset === currentAssetChart) {
      setYStart(chartData.start?.y * 0.8);
      setYEnd(chartData.end?.y * 1.3);

      return;
    } else {
      fetchChartByAsset(asset, chartData.apiStart, chartData.apiEnd);

      setYStart(chartData.start?.y);
      setYEnd(chartData.end?.y);
    }
  }, [assetChart]);

  return (
    <LineChart
      statusType={assetChartLoading ? 'loading' : 'finished'}
      loadingText="Loading Your Chart Details"
      series={[
        {
          title: 'Balance Chart',
          type: 'line',
          data: assetChart,
        },
      ]}
      xDomain={[startDate, endDate]}
      yDomain={[yStart, yEnd]}
      i18nStrings={{
        filterLabel: 'Filter displayed data',
        filterPlaceholder: 'Filter data',
        filterSelectedAriaLabel: 'selected',
        legendAriaLabel: 'Legend',
        chartAriaRoleDescription: 'line chart',
        xTickFormatter: (e) =>
          e
            .toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
              hour: 'numeric',
              minute: 'numeric',
              hour12: false,
            })
            .split(',')
            .join('\n'),
        yTickFormatter: undefined,
      }}
      ariaLabel="Single data series line chart"
      errorText="Error loading data."
      height={360}
      hideFilter
      hideLegend
      recoveryText="Retry"
      xScaleType="time"
      xTitle="Time (UTC)"
      empty={
        <Box textAlign="center" color="inherit">
          <b>No data available</b>
          <Box variant="p" color="inherit">
            There is no data available
          </Box>
        </Box>
      }
      noMatch={
        <Box textAlign="center" color="inherit">
          <b>No matching data</b>
          <Box variant="p" color="inherit">
            There is no matching data to display
          </Box>
          <Button>Clear filter</Button>
        </Box>
      }
    />
  );
}

export default PortfolioChart;
