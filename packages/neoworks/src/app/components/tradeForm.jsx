import * as React from 'react';
import {
  Form,
  Header,
  Button,
  SpaceBetween,
  FormField,
  ButtonDropdown,
  Input,
  Select,
} from '@cloudscape-design/components';
import TradeModal from './tradeModal';

export function TradeForm() {
  const [amount, setAmount] = React.useState('0');
  const [orderType, setOrderType] = React.useState('buy');

  //   const [visible, setVisible] = React.useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    <TradeModal visible="true" />;
  };

  const displayOrderType = (e) => {
    console.log(e.detail.id);
    setOrderType(e.detail.id);
  };

  const [selectedOption, setSelectedOption] = React.useState({
    label: 'BTC-USD',
    value: 'BTC-USD',
  });

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Form
          header={<Header variant="h3">Place an Order</Header>}
          actions={
            <SpaceBetween direction="horizontal" size="xs">
              <Button variant="primary">Submit</Button>
            </SpaceBetween>
          }
        >
          {/* <TradeModal visible="true" /> */}
          <SpaceBetween direction="vertical" size="l">
            <ButtonDropdown
              onItemClick={displayOrderType}
              items={[
                { text: 'Buy', id: 'buy', disabled: false },
                { text: 'Sell', id: 'sell', disabled: false },
              ]}
            >
              {orderType}
            </ButtonDropdown>
            <FormField label="Asset" id="asset">
              <Select
                placeholder="Bitcoin"
                selectedOption={selectedOption}
                onChange={({ detail }) =>
                  setSelectedOption(detail.selectedOption)
                }
                required="true"
                options={[
                  { label: 'BTC-USD', value: 'BTC-USD' },
                  { label: 'ETH-USD', value: 'ETH_USD' },
                  { label: 'SOL', value: 'SOL' },
                  { label: 'CARDANO', value: 'CARDANO' },
                  { label: 'MATIC', value: 'MATIC' },
                  { label: 'ATOM', value: 'ATOM' },
                ]}
              />
            </FormField>
            <FormField label="amount" id="amount">
              <Input
                placeholder="0"
                onChange={({ detail }) => setAmount(detail.value)}
                value={amount}
              />
            </FormField>
          </SpaceBetween>
          <div>
            <p> BTC Balance: $12,000</p>
          </div>
        </Form>
      </form>
    </div>
  );
}

export default TradeForm;
