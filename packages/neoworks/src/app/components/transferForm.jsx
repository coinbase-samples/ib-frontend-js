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
import TransferModal from '../components/transferModal';

export function TransferForm(props) {
  const [quantity, setQuantity] = React.useState('0');
  const [TransferType, setTransferType] = React.useState('Transfer');

  const [showPreviewModal, setShowPreviewModal] = React.useState(false);
  const { asset } = props;
  const [selectedOption, setSelectedOption] = React.useState({
    label: asset ? asset : 'BTC-USD',
    value: asset ? asset : 'BTC-USD',
  });

  const handlePreviewSubmit = (e) => {
    e.preventDefault();
    setShowPreviewModal(true);
  };

  const closePreviewModal = () => {
    setShowPreviewModal(false);
  };
  const displayTransferType = (e) => {
    setTransferType(e.detail.id);
  };

  return (
    <div>
      <form onSubmit={handlePreviewSubmit}>
        <Form
          header={<Header variant="h3">Place an Transfer</Header>}
          actions={
            <SpaceBetween direction="horizontal" size="xs">
              <Button variant="primary">
                {TransferType} {selectedOption.value}
              </Button>
            </SpaceBetween>
          }
        >
          <SpaceBetween direction="vertical" size="l">
            <ButtonDropdown
              onItemClick={displayTransferType}
              items={[
                { text: 'Transfer', id: 'Transfer', disabled: false },
                { text: 'Withdraw', id: 'Withdraw', disabled: false },
              ]}
            >
              {TransferType}
            </ButtonDropdown>
            <FormField label="Asset" id="asset">
              <Select
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
            <p> {selectedOption.value} Balance: $12,000</p>
          </div>
        </Form>
      </form>
      <TransferModal
        open={showPreviewModal}
        close={closePreviewModal}
        qty={quantity}
        asset={selectedOption.value}
        type={TransferType}
      />
    </div>
  );
}

export default TransferForm;
