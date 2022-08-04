import { Box, Button, LineChart,  } from '@cloudscape-design/components';

/* eslint-disable-next-line */

// const StyledHome = styled.div`
//   color: blue;
// `;

export function BalanceChart(props) {
    return (    
        <LineChart
          series={[
            {
              title: "Site 1",
              type: "line",
              data: [
                { x: new Date(1601006400000), y: 58020 },
                { x: new Date(1601007300000), y: 102402 },
                { x: new Date(1601008200000), y: 104920 },
                { x: new Date(1601009100000), y: 94031 },
                { x: new Date(1601010000000), y: 125021 },
                { x: new Date(1601010900000), y: 159219 },
                { x: new Date(1601011800000), y: 193082 },
                { x: new Date(1601012700000), y: 162592 },
                { x: new Date(1601013600000), y: 274021 },
                { x: new Date(1601014500000), y: 264286 },
                { x: new Date(1601015400000), y: 289210 },
                { x: new Date(1601016300000), y: 256362 },
                { x: new Date(1601017200000), y: 257306 },
                { x: new Date(1601018100000), y: 186776 },
                { x: new Date(1601019000000), y: 294020 },
                { x: new Date(1601019900000), y: 385975 },
                { x: new Date(1601020800000), y: 486039 },
                { x: new Date(1601021700000), y: 490447 },
                { x: new Date(1601022600000), y: 361845 },
                { x: new Date(1601023500000), y: 339058 },
                { x: new Date(1601024400000), y: 298028 },
                { x: new Date(1601025300000), y: 231902 },
                { x: new Date(1601026200000), y: 224558 },
                { x: new Date(1601027100000), y: 253901 },
                { x: new Date(1601028000000), y: 102839 },
                { x: new Date(1601028900000), y: 234943 },
                { x: new Date(1601029800000), y: 204405 },
                { x: new Date(1601030700000), y: 190391 },
                { x: new Date(1601031600000), y: 183570 },
                { x: new Date(1601032500000), y: 162592 },
                { x: new Date(1601033400000), y: 148910 },
                { x: new Date(1601034300000), y: 229492 },
                { x: new Date(1601035200000), y: 293910 }
              ],
              valueFormatter: function o(e) {
                return Math.abs(e) >= 1e9
                  ? (e / 1e9).toFixed(1).replace(/\.0$/, "") +
                      "G"
                  : Math.abs(e) >= 1e6
                  ? (e / 1e6).toFixed(1).replace(/\.0$/, "") +
                    "M"
                  : Math.abs(e) >= 1e3
                  ? (e / 1e3).toFixed(1).replace(/\.0$/, "") +
                    "K"
                  : e.toFixed(2);
              }
            }
          ]}
          xDomain={[
            new Date(1601006400000),
            new Date(1601035200000)
          ]}
          yDomain={[0, 500000]}
          i18nStrings={{
            filterLabel: "Filter displayed data",
            filterPlaceholder: "Filter data",
            filterSelectedAriaLabel: "selected",
            legendAriaLabel: "Legend",
            chartAriaRoleDescription: "line chart",
            xTickFormatter: e =>
              e
                .toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  hour: "numeric",
                  minute: "numeric",
                  hour12: !1
                })
                .split(",")
                .join("\n"),
            yTickFormatter: undefined
          }}
          ariaLabel="Single data series line chart"
          errorText="Error loading data."
          height={300}
          hideFilter
          hideLegend
          loadingText="Loading chart"
          recoveryText="Retry"
          xScaleType="time"
        //   xTitle="Time (UTC)"
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
