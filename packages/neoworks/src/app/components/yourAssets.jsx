import { Table, Box, Link } from '@cloudscape-design/components';
import { PortfolioContext } from '../context/portfolioContext';
import { useContext, useEffect } from 'react';
import { Icons } from '../utils/Icons';

export function YourAssets() {
  const {
    portfolio,
    portfolioLoading: portfolioLoaded,
    fetchPortfolio,
  } = useContext(PortfolioContext);

  const porfolioValues = portfolio.length > 0;
  console.log(porfolioValues);
  useEffect(() => {
    if (!portfolioLoaded && portfolio?.length === 0) {
      fetchPortfolio();
    }
  }, []);
  return (
    <Table
      id="portFolioTable"
      trackBy="asset"
      columnDefinitions={[
        {
          id: 'icon',
          header: '',
          width: 30,
          cell: (e) => <Icons asset={e.currency} />,
        },
        {
          id: 'asset',
          header: 'Asset',
          width: 30,
          cell: (e) =>
            e.currency !== 'USD' ? (
              <Link href={`#/assets/${e.currency}`}>{e.currency}</Link>
            ) : (
              <p>USD</p>
            ),
        },
        {
          id: 'amount',
          header: 'Amount',
          width: 50,
          cell: (item) =>
            item.currency !== 'USD' ? item.available : item.available,
        },
        {
          id: 'balance',
          header: 'Balance',
          width: 50,
          cell: (item) =>
            item.currency !== 'USD' ? item.fiatValue : item.available,
        },
      ]}
      // header={
      //   cancelOrderPreview ? 'Order Cancellation Confirm' : 'Order Status'
      // }
      items={porfolioValues ? portfolio : []}
      loading={portfolioLoaded}
      loadingText="Loading Portfolio"
      empty={
        <Box textAlign="center" color="inherit">
          <b>No Assets</b>
          <Box padding={{ bottom: 's' }} variant="p" color="inherit">
            No Assets to display.
          </Box>
        </Box>
      }
    />
  );
}

export default YourAssets;
