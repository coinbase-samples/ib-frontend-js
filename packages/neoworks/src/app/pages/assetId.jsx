import * as React from 'react';
import Tabs from '@cloudscape-design/components/tabs';
import { PureAssetLanding } from '../components/assets/assetLandingPage';
export function AssetId() {
  return (
    <Tabs
      tabs={[
        {
          label: 'Overview',
          id: 'first',
          content: <PureAssetLanding />,
        },
      ]}
      variant="container"
    />
  );
}

export default AssetId;
