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
import { WebsocketContext } from '../context/websocketContext';

import { PortfolioContext } from '../context/portfolioContext';
import { useContext, useEffect } from 'react';
import _ from 'lodash';

export function TradeForm(props) {
  const tradingOptions = [
    { label: 'BTC', value: 'BTC_USD' },
    { label: 'ETH', value: 'ETH_USD' },
    { label: 'SOL', value: 'SOL_USD' },
    { label: 'ADA', value: 'ADA_USD' },
    { label: 'MATIC', value: 'MATIC_USD' },
    { label: 'ATOM', value: 'ATOM_USD' },
  ];

  const { assetFeed } = useContext(WebsocketContext);

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

  const [quantity, setQuantity] = React.useState('1');
  const [limitPrice, setLimitPrice] = React.useState(0);

  const [orderType, setOrderType] = React.useState('Buy');
  const [orderSide, setOrderSideType] = React.useState('ORDER_SIDE_BUY');
  const [error, setError] = React.useState('');
  const [showPreviewModal, setShowPreviewModal] = React.useState(false);
  const urlAsset = useParams().asset;
  let homePage;
  if (urlAsset) {
    homePage = false;
  } else {
    homePage = true;
  }

  const [selectedOption, setSelectedOption] = React.useState({
    label: urlAsset ? urlAsset : 'BTC',
    value: urlAsset ? urlAsset : 'BTC_USD',
  });

  const [selectedOrderedType, setSelectedOrderedType] = React.useState({
    label: 'Market',
    value: 'MARKET',
  });
  const handleQuantity = (qty) => {
    if (!isNaN(+qty)) {
      setQuantity(qty);
      setError('');
    } else {
      setError('Please enter an integer value');
    }
  };

  const handleLimitPrice = (lp) => {
    if (!isNaN(+lp)) {
      setLimitPrice(lp);
      setError('');
    } else {
      setError('Please enter an integer value');
    }
  };

  useEffect(() => {
    if (!portfolioLoaded && portfolio?.length === 0) {
      fetchPortfolio();
    }
    if (!assetsLoaded && assets?.length === 0) {
      fetchAssets();
    }
  }, []);

  // const assetObject = _.filter(assets, { ticker: selectedOption.label });

  const assetPriceFilter = _.filter(assetFeed, {
    ticker: selectedOption.label,
  });

  const assetPrice = assetPriceFilter[0]?.lowBid;

  const portfolioObject = _.filter(portfolio, {
    currency: selectedOption?.label,
  });
  const fiatObject = _.filter(portfolio, {
    currency: 'USD',
  });

  let amountHeld;
  let allowedSale;
  const fiatBalance = fiatObject[0]?.available;

  const portfolioPrice = portfolioObject[0]?.available;

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
    if (!urlAsset) {
      return tradingOptions;
    } else {
      const filteredAsset = _.filter(tradingOptions, {
        label: urlAsset,
      });
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
                {orderType} {selectedOption.label}
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
            <Select
              selectedOption={selectedOrderedType}
              onChange={({ detail }) =>
                setSelectedOrderedType(detail.selectedOption)
              }
              options={[
                { label: 'Market', value: 'MARKET' },
                { label: 'Limit', value: 'LIMIT' },
              ]}
              selectedAriaLabel="Selected Order Type"
            />

            {selectedOrderedType.value === 'LIMIT' ? (
              <FormField label="Limit Price" id="limitPrice" errorText={error}>
                <Input
                  onChange={({ detail }) => handleLimitPrice(detail.value)}
                  value={limitPrice}
                />
              </FormField>
            ) : (
              ''
            )}
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

            <FormField label="Quantity" id="quantity" errorText={error}>
              <Input
                onChange={({ detail }) => handleQuantity(detail.value)}
                value={quantity}
              />
            </FormField>
          </SpaceBetween>
          <div>
            <p>
              {selectedOption?.label} Balance: {amountHeld}
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
        orderType={selectedOrderedType.value}
        fiatBalance={fiatBalance}
        orderSideType={orderType}
        limitPrice={limitPrice}
        homePage={homePage}
      />
    </div>
  );
}

export default TradeForm;
