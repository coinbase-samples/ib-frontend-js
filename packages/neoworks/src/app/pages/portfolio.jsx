import * as React from 'react';
import Tabs from '@cloudscape-design/components/tabs';

export function Portfolio() {
  return (
    <Tabs
      tabs={[
        {
          label: 'Overview',
          id: 'first',
          content: 'Hi Portfolio',
        },
      ]}
      variant="container"
    />
  );
}

export default Portfolio;
