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
import { useParams } from 'react-router-dom';
import { AssetContext } from '../context/assetsContext';
import { PortfolioContext } from '../context/portfolioContext';
import { useContext, useEffect } from 'react';
import _ from 'lodash';

export function TradeForm(props) {
  const tradingOptions = [
    { label: 'BTC', value: 'BTC' },
    { label: 'ETH', value: 'ETH' },
    { label: 'SOL', value: 'SOL' },
    { label: 'CARDANO', value: 'CARDANO' },
    { label: 'MATIC', value: 'MATIC' },
    { label: 'ATOM', value: 'ATOM' },
  ];
  const {
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
  const urlAsset = useParams().asset;

  const [selectedOption, setSelectedOption] = React.useState({
    label: urlAsset ? urlAsset : 'BTC',
    value: urlAsset ? urlAsset : 'BTC',
  });

  useEffect(() => {
    if (!portfolioLoaded && portfolio?.length === 0) {
      fetchPortfolio();
    }
    if (!assetsLoaded && assets?.length === 0) {
      fetchAssets();
    }
  }, []);

  const assetObject = _.filter(assets?.assets, { name: selectedOption.value });
  const assetPrice = assetObject[0]?.price;
  const portfolioObject = _.filter(portfolio, {
    currency: selectedOption?.value,
  });

  const fiatObject = _.filter(portfolio, {
    currency: 'USD',
  });

  let amountHeld;
  let allowedSale;
  const fiatBalance = fiatObject[0]?.balance;
  const portfolioPrice = portfolioObject[0]?.balance;

  if (portfolioPrice) {
    amountHeld = portfolioPrice;
    allowedSale = true;
  } else {
    amountHeld = 0;
    allowedSale = false;
  }

  const handlePreviewSubmit = (e) => {
    e.preventDefault();
    setShowPreviewModal(true);
  };

  const dropDownOptions = () => {
    console.log(assetObject);
    if (!urlAsset) {
      return tradingOptions;
    } else {
      console.log(urlAsset);

      const filteredAsset = _.filter(tradingOptions, {
        label: urlAsset,
      });
      console.log(filteredAsset[0]);
      // setSelectedOption(filteredAsset[0]);
      return filteredAsset;
    }
  };

  const closePreviewModal = () => {
    setShowPreviewModal(false);
  };
  const displayOrderType = (e) => {
    if (e.detail.id === 'Buy') {
      setOrderType('BUY');
      setOrderSideType('ORDER_SIDE_BUY');
    } else {
      setOrderType('Sell');
      setOrderSideType('ORDER_SIDE_SELL');
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
                allowedSale
                  ? { text: 'Sell', id: 'Sell', disabled: false }
                  : {},
              ]}
            >
              {orderType}
            </ButtonDropdown>
            <FormField label="Asset" id="asset">
              {!urlAsset ? (
                <Select
                  selectedOption={selectedOption}
                  onChange={({ detail }) =>
                    setSelectedOption(detail.selectedOption)
                  }
                  required="true"
                  options={tradingOptions}
                />
              ) : (
                <Select
                  selectedOption={selectedOption}
                  disabled
                  required="true"
                  options={dropDownOptions()}
                />
              )}
            </FormField>
            <div>
              <h4>Asset Price:</h4> ${assetPrice}
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
              {selectedOption?.value} Balance: {amountHeld}
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
        orderSideType={orderType}
      />
    </div>
  );
}

export default TradeForm;
