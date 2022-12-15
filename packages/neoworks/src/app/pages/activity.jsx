import * as React from 'react';
import Tabs from '@cloudscape-design/components/tabs';
import { OrderActivity } from '../components/order/orderActivity';

export function Activity() {
  return (
    <Tabs
      tabs={[
        {
          label: 'Orders',
          id: 'ActivityPage-1',
          content: <OrderActivity />,
        },
      ]}
      variant="container"
    />
  );
}

export default Activity;
