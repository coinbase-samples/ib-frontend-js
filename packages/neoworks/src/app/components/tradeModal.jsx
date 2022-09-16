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
  const { qty, assetPrice, fiatBalance, side, orderSideType } = props;
  const orderTotal = qty * assetPrice + platformFee;
  // const [submitButton, setSubmitButton] = React.useState(true);

  const submitOrder = async () => {
    setOrderPreview(false);
    const body = {
      productId: props.asset,
      side,
      orderType: 'limit',
      quantity: qty,
      limitPrice: assetPrice,
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

  const overBudget = orderTotal > fiatBalance;

  const orderResponse = () => {
    if (orderDetail?.code) {
      return orderDetail?.message;
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
                  <Button
                    href={`#/activity/orders/${orderDetail?.orderId}`}
                    variant="primary"
                  >
                    Order Details
                  </Button>
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
              {orderSideType} {props.asset}
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
            <ColumnLayout borders="horizontal" columns={3}>
              <div>
                <h5>Asset:</h5>
              </div>
              <div>{props.asset}</div>

              <div>
                <h5>Quantity: </h5>
              </div>
              <div>{props.qty}</div>
              <div>
                <h5>Platform Fee:</h5>
              </div>
              <div>{platformFee}</div>
              <div>
                <h5>Payment Type: </h5>
              </div>
              <div>USD</div>
              <div>
                <h5>USD Balance: </h5>
              </div>
              <div>{fiatBalance}</div>

              <div>
                <h5>Total</h5>
              </div>
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
