import * as React from 'react';
import {
  Form,
  Header,
  Input,
  Button,
  SpaceBetween,
  FormField,
  ButtonDropdown,
  Select,
} from '@cloudscape-design/components';
import { TradeModal } from './tradeModal';
import { AssetContext } from '../context/assetsContext';
import { PortfolioContext } from '../context/portfolioContext';
import { useContext, useEffect } from 'react';
import _ from 'lodash';

export function TradeForm(props) {
  const {
    asset,
    assets,
    assetsLoading: assetsLoaded,
    fetchAssets,
  } = useContext(AssetContext);

  const {
    portfolio,
    portfolioLoading: portfolioLoaded,
    fetchPortfolio,
  } = useContext(PortfolioContext);

  const [quantity, setQuantity] = React.useState(1);
  const [orderType, setOrderType] = React.useState('Buy');
  const [orderSide, setOrderSideType] = React.useState('ORDER_SIDE_BUY');

  const [showPreviewModal, setShowPreviewModal] = React.useState(false);

  const [selectedOption, setSelectedOption] = React.useState({
    label: asset ? asset : 'BTC',
    value: asset ? asset : 'BTC',
  });

  useEffect(() => {
    if (!portfolioLoaded && portfolio?.length === 0) {
      fetchPortfolio();
    }
    if (!assetsLoaded && assets?.length === 0) {
      fetchAssets();
    }
  }, [
    assets,
    fetchAssets,
    portfolio,
    fetchPortfolio,
    assetsLoaded,
    portfolioLoaded,
  ]);

  const assetObject = _.filter(assets?.assets, { name: selectedOption.value });
  const assetPrice = assetObject[0]?.price;
  const portfolioObject = _.filter(portfolio, {
    asset: selectedOption?.value,
  });

  const fiatObject = _.filter(portfolio, {
    asset: 'USD',
  });

  const fiatBalance = fiatObject[0]?.amount;
  const portfolioPrice = portfolioObject[0]?.amount;

  const handlePreviewSubmit = (e) => {
    e.preventDefault();
    setShowPreviewModal(true);
  };

  const closePreviewModal = () => {
    setShowPreviewModal(false);
  };
  const displayOrderType = (e) => {
    console.log(e);
    if (e.detail.id === 'Buy') {
      setOrderType('Buy');
      setOrderSideType('Buy');

      console.log(orderType);
    } else {
      setOrderType('Sell');
      setOrderSideType('ORDER_SIDE_BUY');
    }
  };
  return (
    <div>
      <form onSubmit={handlePreviewSubmit}>
        <Form
          header={<Header variant="h3">Place Order</Header>}
          actions={
            <SpaceBetween direction="horizontal" size="xs">
              <Button variant="primary">
                {orderType} {selectedOption.value}
              </Button>
            </SpaceBetween>
          }
        >
          <SpaceBetween direction="vertical" size="l">
            <ButtonDropdown
              onItemClick={displayOrderType}
              items={[
                {
                  text: 'Buy',
                  id: 'Buy',
                  disabled: false,
                },
                { text: 'Sell', id: 'Sell', disabled: false },
              ]}
            >
              {orderType}
            </ButtonDropdown>
            <FormField label="Asset" id="asset">
              <Select
                selectedOption={selectedOption}
                onChange={({ detail }) =>
                  setSelectedOption(detail.selectedOption)
                }
                required="true"
                options={[
                  { label: 'BTC', value: 'BTC' },
                  { label: 'ETH', value: 'ETH' },
                  { label: 'SOL', value: 'SOL' },
                  { label: 'CARDANO', value: 'CARDANO' },
                  { label: 'MATIC', value: 'MATIC' },
                  { label: 'ATOM', value: 'ATOM' },
                ]}
              />
            </FormField>
            <div>
              <p>
                <h4>Asset Price:</h4> ${assetPrice}
              </p>
            </div>

            <FormField label="Quantity" id="quantity">
              <Input
                onChange={({ detail }) => setQuantity(detail.value)}
                value={quantity}
              />
            </FormField>
          </SpaceBetween>
          <div>
            <p>
              {selectedOption?.value} Balance: {portfolioPrice}
            </p>
          </div>
        </Form>
      </form>
      <TradeModal
        open={showPreviewModal}
        close={closePreviewModal}
        qty={quantity}
        asset={selectedOption.value}
        side={orderSide}
        assetPrice={assetPrice}
        fiatBalance={fiatBalance}
      />
    </div>
  );
}

export default TradeForm;
