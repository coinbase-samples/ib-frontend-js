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
  // const [status, setStatus] = React.useState('loading');

  const { asset } = props;
  const currentAssetChart = asset;

  const now = Date.now();

  const endDate = new Date(now);
  const startDate = new Date(endDate.getTime() - 5 * 24 * 60 * 60 * 1000);
  const apiStart = startDate.getTime();
  const apiEnd = endDate.getTime();

  console.log(startDate, endDate, apiStart, apiEnd);
  useEffect(() => {
    console.log(!assetChart.length);
    if (!assetChart.length) {
      fetchChartByAsset(asset, apiStart, apiEnd);
      const start = _.first(assetChart);
      const end = assetChart.pop();

      setYStart(start?.y);
      setYEnd(end?.y);
      // setStatus('finished');
    } else if (assetChart[0].asset === currentAssetChart) {
      const start = _.first(assetChart);
      const end = assetChart.pop();

      setYStart(start?.y * 0.9);
      setYEnd(end?.y * 1.1);
      // setStatus('finished');

      return;
    } else {
      fetchChartByAsset(asset, apiStart, apiEnd);
      const start = _.first(assetChart);
      const end = assetChart.pop();

      setYStart(start?.y);
      setYEnd(end?.y);
      // setStatus('finished');
    }
  }, [assetChart]);

  return (
    <LineChart
      statusType={!assetChartLoading ? 'finished' : 'loaded'}
      loadingText="Loading Your Chart Details"
      series={[
        {
          title: 'Asset Price',
          type: 'line',
          data: assetChart,
          // valueFormatter: function o(e) {
          //   return Math.abs(e) >= 1e9
          //     ? (e / 1e9).toFixed(1).replace(/\.0$/, '') + 'G'
          //     : Math.abs(e) >= 1e6
          //     ? (e / 1e6).toFixed(1).replace(/\.0$/, '') + 'M'
          //     : Math.abs(e) >= 1e3
          //     ? (e / 1e3).toFixed(1).replace(/\.0$/, '') + 'K'
          //     : e.toFixed(2);
          // },
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
