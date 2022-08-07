import * as React from 'react';
import Tabs from '@cloudscape-design/components/tabs';
import OrderActivity from '../components/orderActivity';

export function Activity() {
  return (
    <Tabs
      tabs={[
        {
          label: 'Orders',
          id: 'first',
          content: <OrderActivity />,
        },
        {
          label: 'Transfers',
          id: 'second',
          content: 'Second tab content area',
        },
      ]}
      variant="container"
    />
  );
}

export default Activity;
