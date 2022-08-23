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

  useEffect(() => {
    if (!portfolioLoaded && portfolio?.length === 0) {
      fetchPortfolio();
    }
  }, [portfolio, portfolioLoaded, fetchPortfolio]);
  return (
    <Table
      columnDefinitions={[
        {
          id: 'icon',
          header: '',
          width: 30,
          cell: (e) => <Icons asset={e.asset} />,
        },
        {
          id: 'asset',
          header: 'Asset',
          width: 30,
          cell: (e) => <Link href={`#/assets/${e.asset}`}>{e.asset}</Link>,
        },
        {
          id: 'amount',
          header: 'Amount',
          width: 50,
          cell: (item) => item.amount || '-',
        },
        {
          id: 'qty',
          header: 'quantity',
          width: 50,
          cell: (item) => item.qty || '-',
        },
      ]}
      items={portfolio}
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
