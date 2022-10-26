import * as React from 'react';
import { Box, Button, LineChart } from '@cloudscape-design/components';
import { ChartContext } from '../context/chartsContext';
import { useContext, useEffect } from 'react';
import _ from 'lodash';

export function AssetChart(props) {
  const { assetChart, assetChartLoading, fetchChartByAsset } =
    useContext(ChartContext);

  const [yStart, setYStart] = React.useState(0);
  const [yEnd, setYEnd] = React.useState(1000);

  const { asset } = props;
  const currentAssetChart = asset;

  const now = Date.now();

  const endDate = new Date(now);
  const startDate = new Date(endDate.getTime() - 5 * 24 * 60 * 60 * 1000);
  const apiStart = startDate.getTime();
  const apiEnd = endDate.getTime();

  useEffect(() => {
    if (!assetChart.length && !assetChartLoading) {
      fetchChartByAsset(asset, apiStart, apiEnd);
      const start = _.first(assetChart);
      const end = assetChart.pop();

      setYStart(start?.y);
      setYEnd(end?.y);
    } else if (assetChart[0].asset === currentAssetChart) {
      const start = _.first(assetChart);
      const end = assetChart.pop();
      setYStart(start?.y * 0.8);
      setYEnd(end?.y * 1.3);

      return;
    } else {
      fetchChartByAsset(asset, apiStart, apiEnd);
      const start = _.first(assetChart);
      const end = assetChart.pop();

      setYStart(start?.y);
      setYEnd(end?.y);
    }
  }, [assetChart]);

  return (
    <LineChart
      statusType={assetChartLoading ? 'loading' : 'finished'}
      loadingText="Loading Your Chart Details"
      series={[
        {
          title: 'Asset Price',
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
              hour12: !1,
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
export default AssetChart;
