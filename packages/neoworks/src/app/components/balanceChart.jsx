import { Box, Button, LineChart } from '@cloudscape-design/components';
import { ChartContext } from '../context/chartsContext';
import { useContext, useEffect } from 'react';

/* eslint-disable-next-line */

// const StyledHome = styled.div`
//   color: blue;
// `;

// const endDate = new Date() * 1000;
// const startDate = new Date();
// startDate.setDate(startDate.getDate() - 5 * 1000);

// console.log(startDate.getTime(), endDate.getTime());
export function BalanceChart(props) {
  const { assetChart, assetChartLoading, fetchChartByAsset } =
    useContext(ChartContext);

  const { asset } = props;

  const currentAssetChart = asset;

  //const assetMatch = false;

  useEffect(() => {
    console.log(!assetChart.length);
    if (!assetChart.length) {
      fetchChartByAsset(asset);
    } else if (assetChart[0].asset === currentAssetChart) {
      return;
    } else {
      fetchChartByAsset(asset);
    }
  }, [assetChart]);

  console.log(assetChart);
  return (
    <LineChart
      trackBy={asset}
      loading={assetChartLoading}
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
      xDomain={[new Date(1665076359000), new Date(1665454359000)]}
      yDomain={[0, 2000]}
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

export default BalanceChart;
