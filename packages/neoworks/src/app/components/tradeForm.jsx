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
  const [quantity, setQuantity] = React.useState('0');
  const [orderType, setOrderType] = React.useState('Buy');

  const [showPreviewModal, setShowPreviewModal] = React.useState(false);

  const [selectedOption, setSelectedOption] = React.useState({
    label: 'BTC-USD',
    value: 'BTC-USD',
  });

  const handlePreviewSubmit = (e) => {
    e.preventDefault();
    setShowPreviewModal(true);
  };

  const closePreviewModal = () => {
    setShowPreviewModal(false);
  };
  const displayOrderType = (e) => {
    console.log(e.detail.id);
    setOrderType(e.detail.id);
  };

  return (
    <div>
      <form onSubmit={handlePreviewSubmit}>
        <Form
          header={<Header variant="h3">Place an Order</Header>}
          actions={
            <SpaceBetween direction="horizontal" size="xs">
              <Button variant="primary">Submit</Button>
            </SpaceBetween>
          }
        >
          <SpaceBetween direction="vertical" size="l">
            <ButtonDropdown
              onItemClick={displayOrderType}
              items={[
                { text: 'Buy', id: 'Buy', disabled: false },
                { text: 'Sell', id: 'Sell', disabled: false },
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
            <FormField label="quantity" id="quantity">
              <Input
                placeholder="0"
                onChange={({ detail }) => setQuantity(detail.value)}
                value={quantity}
              />
            </FormField>
          </SpaceBetween>
          <div>
            <p> BTC Balance: $12,000</p>
          </div>
        </Form>
      </form>
      <TradeModal
        open={showPreviewModal}
        close={closePreviewModal}
        qty={quantity}
        asset={selectedOption.value}
        type={orderType}
      />
    </div>
  );
}

export default TradeForm;
