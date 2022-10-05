import * as React from 'react';
import { Icons } from '../utils/Icons';
import { tradeFee } from '../../constants';
import { OrderContext } from '../context/ordersContext';
import { useContext } from 'react';
import {
  Modal,
  HelpPanel,
  Container,
  Popover,
  StatusIndicator,
  TextContent,
  Header,
  Box,
  SpaceBetween,
  Button,
  ColumnLayout,
} from '@cloudscape-design/components';

export function TradeModal(props) {
  const { currentOrder, newOrderLoading, orderDetail } =
    useContext(OrderContext);

  const [orderPreview, setOrderPreview] = React.useState(true);
  const platformFee = tradeFee;
  const {
    qty,
    assetPrice,
    fiatBalance,
    side,
    orderSideType,
    orderType,
    limitPrice,
    homePage,
    asset,
  } = props;

  let orderPrice = assetPrice;
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });

  console.log(assetPrice);

  const USDbalance = formatter.format(fiatBalance);

  if (orderType === 'LIMIT') {
    orderPrice = limitPrice;
  }

  if (orderType === 'MARKET') {
    orderPrice = assetPrice;
  }
  let productId = asset;
  if (!homePage) {
    productId = asset + '_USD';
  }
  const orderTotal = qty * orderPrice + platformFee;
  let orderFail = false;
  const submitOrder = async () => {
    setOrderPreview(false);
    const body = {
      productId,
      side,
      quantity: qty,
      limitPrice: orderPrice,
      orderType,
    };

    await currentOrder(body);
  };

  const closeModal = () => {
    //add an if check to ensure api finishes
    setOrderPreview(true);
    props.close();
  };

  const cancelOrder = () => {
    window.location.reload(false);
  };
  const overBudget = orderTotal > USDbalance;

  const orderResponse = () => {
    if (orderDetail?.code) {
      orderFail = true;
      return (
        <p>We're sorry, your order Failed. Reason: {orderDetail?.message}</p>
      );
    }
    return (
      <p>
        {' '}
        Congrats, we successfully submitted your order for {props.qty}{' '}
        {props.asset}.
      </p>
    );
  };
  return (
    <Modal
      visible={props.open}
      onDismiss={closeModal}
      closeAriaLabel="Close modal"
      header={orderPreview ? 'Order Preview' : 'Order Status'}
    >
      {!orderPreview ? (
        <Container>
          <HelpPanel
            loading={newOrderLoading}
            loadingText="Placing your Order."
            footer={
              <Box float="right">
                <SpaceBetween direction="horizontal" size="xxs">
                  <Button onClick={cancelOrder} variant="link">
                    Close
                  </Button>
                  {orderFail ? (
                    ''
                  ) : (
                    <Button
                      href={`#/activity/orders/${orderDetail?.orderId}`}
                      variant="primary"
                    >
                      Order Details
                    </Button>
                  )}
                </SpaceBetween>
              </Box>
            }
          >
            <Icons asset={props.asset} />
            <div>
              <ul>
                <p>{orderResponse()}</p>
              </ul>
            </div>
          </HelpPanel>
        </Container>
      ) : (
        <Container
          header={
            <Header
              variant="h3"
              description=""
              actions={
                <SpaceBetween direction="horizontal" size="xs">
                  <Button onClick={props.close}>Modify</Button>
                </SpaceBetween>
              }
            >
              <Icons asset={props.asset} />
              {orderType} {orderSideType} {props.asset}
            </Header>
          }
        >
          <HelpPanel
            footer={
              <Box float="right">
                <SpaceBetween direction="horizontal" size="xs">
                  <Button onClick={cancelOrder} variant="link">
                    Cancel
                  </Button>
                  {!overBudget ? (
                    <Button onClick={submitOrder} variant="primary">
                      Submit Order
                    </Button>
                  ) : (
                    <Button onClick={submitOrder} disabled variant="primary">
                      Submit Order
                    </Button>
                  )}
                </SpaceBetween>
              </Box>
            }
          >
            <ColumnLayout variant="text-grid" borders="horizontal" columns={3}>
              <h5>Asset:</h5>
              {props.asset}
              <h5>Quantity: </h5>
              {props.qty}
              <h5>Platform Fee:</h5>
              {platformFee}
              <h5>Payment Type: </h5>
              USD
              <h5>USD Balance: </h5>
              {USDbalance}
              <h5>Total</h5>
              <div style={{ textAlign: 'right' }}>
                {overBudget && side === 'ORDER_SIDE_BUY' ? (
                  <p style={{ color: 'red' }}>
                    order is over budget, please modify
                  </p>
                ) : (
                  <h5>${orderTotal}</h5>
                )}
              </div>
              <div>
                <Popover
                  position="top"
                  size="small"
                  //   triggerType="custom"
                  content={
                    <StatusIndicator type="success">
                      Slippage is the difference between the expected price of
                      an order and the price when the order actually executes.
                    </StatusIndicator>
                  }
                >
                  <TextContent iconName="slippage">
                    <small style={{ textAlign: 'right' }}>
                      how its calculated
                    </small>
                  </TextContent>
                </Popover>
              </div>
            </ColumnLayout>
          </HelpPanel>
        </Container>
      )}
    </Modal>
  );
}

export default TradeModal;
