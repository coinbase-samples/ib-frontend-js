import * as React from 'react';
import Tabs from '@cloudscape-design/components/tabs';

export function AssetId() {
  return (
    <Tabs
      tabs={[
        {
          label: 'Overview',
          id: 'first',
          content: 'Landing Page content',
        },
        {
          label: 'History',
          id: 'second',
          content: 'History content',
        },
      ]}
      variant="container"
    />
  );
}

export default AssetId;
