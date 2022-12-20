import * as React from 'react';
import {
  DatePicker,
  Form,
  Header,
  Input,
  Button,
  SpaceBetween,
  FormField,
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
    { label: 'BTC', value: 'BTC-USD' },
    { label: 'ETH', value: 'ETH-USD' },
    { label: 'SOL', value: 'SOL-USD' },
    { label: 'ADA', value: 'ADA-USD' },
    { label: 'MATIC', value: 'MATIC-USD' },
    { label: 'ATOM', value: 'ATOM-USD' },
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
  const [expiryTime, setExpiryTime] = React.useState('');
  const [limitPrice, setLimitPrice] = React.useState(1);
  const [orderSide, setOrderSideType] = React.useState('ORDER_SIDE_BUY');

  const [selectedSideOption, setSelectedSideOption] = React.useState({
    label: 'Buy',
    value: 'Buy',
  });
  const [selectedOption, setSelectedOption] = React.useState({
    label: 'GOOD UNTIL CANCELLED',
    value: 'GOOD_UNTIL_CANCELLED',
  });
  const [error, setError] = React.useState('');
  const [dateValue, setDateValue] = React.useState('');
  const [showPreviewModal, setShowPreviewModal] = React.useState(false);

  const [selectedOrderedType, setSelectedOrderedType] = React.useState({
    label: 'Market',
    value: 'MARKET',
  });
  const urlAsset = useParams().asset;
  let homePage;

  const orderMinimum = 1.0;
  const [selectedAsset, setSelectedAsset] = React.useState({
    label: urlAsset ? urlAsset : 'BTC',
    value: urlAsset ? urlAsset : 'BTC-USD',
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

  const assetPriceFilter = _.filter(assetFeed, {
    ticker: selectedAsset.label,
  });
  const assetPrice = assetPriceFilter[0]?.lowBid;
  const portfolioObject = _.filter(portfolio, {
    currency: selectedAsset?.label,
  });
  const fiatObject = _.filter(portfolio, {
    currency: 'USD',
  });

  const fiatBalance = fiatObject[0]?.available;
  const allowedOrder = assetPrice < 100;

  const portfolioPrice = portfolioObject[0]?.available;

  const allowedSale = portfolioPrice > 0;

  const handlePreviewSubmit = (e) => {
    e.preventDefault();
    const orderAmount = quantity * assetPrice;
    if (orderAmount > orderMinimum) {
      setShowPreviewModal(true);
    } else {
      alert(
        'Your order amount is:  $' + orderAmount + '.  Must be greater than $1'
      );
    }
  };
  const dropDownOptions = () => {
    if (!urlAsset) {
      return tradingOptions;
    } else {
      const filteredAsset = tradingOptions.find((a) => a.value === urlAsset);

      return filteredAsset;
    }
  };

  const closePreviewModal = () => {
    setShowPreviewModal(false);
  };

  const displayOrderType = (e) => {
    if (e.selectedOption.label === 'Buy') {
      setSelectedSideOption(e.selectedOption);
      setOrderSideType('ORDER_SIDE_BUY');
    } else {
      setSelectedSideOption(e.selectedOption);
      setOrderSideType('ORDER_SIDE_SELL');
    }
  };
  return (
    <div>
      <form onSubmit={handlePreviewSubmit}>
        <Form
          id="tradeForm"
          header={<Header variant="h3">Place Order</Header>}
          actions={
            <SpaceBetween id="formLabel" direction="horizontal" size="xs">
              {allowedOrder ? (
                <Button id="submit" variant="primary">
                  {selectedSideOption.label} {selectedAsset.label}
                </Button>
              ) : (
                <p style={{ color: 'red' }}>
                  Insufficient funds. ${fiatBalance}
                </p>
              )}
            </SpaceBetween>
          }
        >
          <Select
            id="type"
            selectedOption={selectedSideOption}
            onChange={({ detail }) => displayOrderType(detail)}
            options={
              allowedSale
                ? [
                    { label: 'Buy', value: 'Buy' },
                    { label: 'Sell', value: 'Sell' },
                  ]
                : [{ label: 'Buy', value: 'Buy' }]
            }
          >
            {selectedSideOption}
          </Select>
          <h4>Order Type</h4>
          <Select
            id="orderType"
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
            <SpaceBetween id="formLabel" direction="horizontal" size="l">
              <FormField label="Limit Price" id="limitPrice" errorText={error}>
                <Input
                  id="price"
                  onChange={({ detail }) => handleLimitPrice(detail.value)}
                  value={limitPrice}
                />
              </FormField>
              <FormField label="Time In Force Type" id="timeType">
                <Select
                  selectedOption={selectedOption}
                  onChange={({ detail }) =>
                    setSelectedOption(detail.selectedOption)
                  }
                  options={[
                    {
                      label: 'GOOD_UNTIL_CANCELLED',
                      value: 'GOOD_UNTIL_CANCELLED',
                    },
                    {
                      label: 'GOOD UNTIL DATE TIME',
                      value: 'GOOD_UNTIL_DATETIME',
                    },
                    {
                      label: 'IMMEDIATE OR CANCEL',
                      value: 'IMMEDIATE_OR_CANCEL',
                    },
                  ]}
                  selectedAriaLabel="Selected"
                />
              </FormField>
              {selectedOption.value === 'GOOD_UNTIL_DATETIME' ? (
                <FormField label="Choose Date" id="dateTime">
                  <DatePicker
                    onChange={({ detail }) => {
                      setExpiryTime(new Date(detail.value));
                      setDateValue(detail.value);
                    }}
                    value={dateValue}
                    openCalendarAriaLabel={(selectedDate) =>
                      'Choose certificate expiry date' +
                      (selectedDate ? `, selected date is ${selectedDate}` : '')
                    }
                    nextMonthAriaLabel="Next month"
                    placeholder="YYYY/MM/DD"
                    previousMonthAriaLabel="Previous month"
                    todayAriaLabel="Today"
                  />
                </FormField>
              ) : (
                ''
              )}
            </SpaceBetween>
          ) : (
            ''
          )}

          <FormField label="Asset" id="asset">
            {!urlAsset ? (
              <Select
                id="selectAsset"
                selectedOption={selectedAsset}
                onChange={({ detail }) =>
                  setSelectedAsset(detail.selectedOption)
                }
                required="true"
                options={tradingOptions}
              />
            ) : (
              <Select
                id="assetSelection"
                selectedOption={selectedAsset}
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
              id="inputQuantity"
              onChange={({ detail }) => handleQuantity(detail.value)}
              value={quantity}
            />
          </FormField>
          <div>
            <p>
              {selectedAsset?.label} Balance: {portfolioPrice}
            </p>
          </div>
        </Form>
      </form>

      <TradeModal
        open={showPreviewModal}
        close={closePreviewModal}
        qty={quantity}
        asset={selectedAsset.value}
        side={orderSide}
        assetPrice={assetPrice}
        orderType={selectedOrderedType.value}
        fiatBalance={fiatBalance}
        orderSideType={selectedSideOption.value}
        limitPrice={limitPrice}
        timeInForceType={selectedOption.value}
        homePage={homePage}
        expiry_time={expiryTime}
      />
    </div>
  );
}

export default TradeForm;
