import * as React from 'react';
import { Button, Table, Box, Header } from '@cloudscape-design/components';

export function YourAssets() {
  return (
    <Table
      columnDefinitions={[
        {
          id: 'asset',
          header: 'Asset',
          cell: (item) => item.asset || '-',
        },
        {
          id: 'amount',
          header: 'Amount',
          cell: (item) => item.amount || '-',
        },
      ]}
      items={[
        {
          asset: 'Bitcoin',
          amount: '$25,000',
        },
        {
          asset: 'Ethereum',
          amount: '$18,000',
        },
        {
          asset: 'Cardano',
          amount: '$16,000',
        },
        {
          asset: 'Matic',

          amount: '$15,000',
        },
      ]}
      loadingText="Loading resources"
      sortingDisabled
      empty={
        <Box textAlign="center" color="inherit">
          <b>No resources</b>
          <Box padding={{ bottom: 's' }} variant="p" color="inherit">
            No resources to display.
          </Box>
          <Button>Create resource</Button>
        </Box>
      }
    />
  );
}

export default YourAssets;
