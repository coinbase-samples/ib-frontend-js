import * as React from 'react';
import { Button, Table, Box, Header } from '@cloudscape-design/components';

export function YourAssets() {
  return (
    <Table
      columnDefinitions={[
        {
          id: 'description',
          header: '',
          cell: (item) => item.description || '-',
        },
      ]}
      items={[
        {
          name: 'Bitcoin',
          alt: 'First',
          description: '$25,000',
          type: '1A',
          size: 'Large',
        },
        {
          name: 'Ethereum',
          alt: 'Second',
          description: '$18,000',
          type: '1B',
          size: 'Large',
        },
        {
          name: 'Ethereum',
          alt: 'Third',
          description: '$16,000',
          type: '1A',
          size: 'Large',
        },
        {
          name: 'Matic',
          alt: 'Fourth',
          description: '$15,000',
          type: '1A',
          size: 'Large',
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
