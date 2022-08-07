import * as React from 'react';
import { Tabs } from '@cloudscape-design/components';
import TradeForm from './tradeForm';
export function TransactionWidget() {
  return (
    <div>
      <Tabs
        tabs={[
          {
            label: 'Buy/Sell',
            id: 'first',
            content: <TradeForm />,
          },
          {
            label: 'Transfer',
            id: 'second',
            content: <div style={{ color: 'red' }}>red text</div>,
          },
        ]}
      />
    </div>
  );
}

export default TransactionWidget;
