import * as React from 'react';
import { Tabs } from '@cloudscape-design/components';
import { TradeForm } from './tradeForm';
import { TransferForm } from './transfer/transferForm';
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
          // {
          //   label: 'Transfer',
          //   id: 'second',
          //   content: <TransferForm />,
          // },
        ]}
      />
    </div>
  );
}

export default TransactionWidget;
