import * as React from 'react';
import Tabs from '@cloudscape-design/components/tabs';
import { AssetLanding } from '../components/assetLandingPage';

export function AssetId() {
  return (
    <Tabs
      tabs={[
        {
          label: 'Overview',
          id: 'first',
          content: <AssetLanding />,
        },
      ]}
      variant="container"
    />
  );
}

export default AssetId;
