import * as React from 'react';
import { LineChart, Box, Button } from '@cloudscape-design/components';
import { ChartContext } from '../../context/chartsContext';
import { dateCalculator } from '../../utils/dateCalculator';

import { useContext, useEffect } from 'react';

export function PortfolioChart(props) {
  const { assetChart, assetChartLoading, fetchChartByAsset } =
    useContext(ChartContext);

  const [yStart, setYStart] = React.useState(0);
  const [yEnd, setYEnd] = React.useState(1000);

  const asset = 'ETH';
  const currentAssetChart = asset;

  const calculatedDate = dateCalculator(assetChart);

  useEffect(() => {
    if (!assetChart.length && !assetChartLoading) {
      fetchChartByAsset(asset, calculatedDate.xStart, calculatedDate.xEnd);

      setYStart(calculatedDate.yStart?.y);
      setYEnd(calculatedDate.yEnd?.y);
    } else if (assetChart[0].asset === currentAssetChart) {
      setYStart(calculatedDate.yStart?.y * 0.8);
      setYEnd(calculatedDate.yEnd?.y * 1.3);

      return;
    } else {
      fetchChartByAsset(asset, calculatedDate.xStart, calculatedDate.xEnd);
      setYStart(calculatedDate.yStart?.y);
      setYEnd(calculatedDate.yEnd?.y);
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
      xDomain={[calculatedDate.startDate, calculatedDate.endDate]}
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
      //   yTitle="$113,757.17"
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
