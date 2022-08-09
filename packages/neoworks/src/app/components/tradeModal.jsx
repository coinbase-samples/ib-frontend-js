import * as React from 'react';
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
} from '@cloudscape-design/components';

export function TradeModal(props) {
  const [orderPreview, setOrderPreview] = React.useState(true);
  console.log(orderPreview);

  const submitOrder = () => {
    setOrderPreview(false);

    alert('Order Submitted');
  };

  const cancelOrder = () => {
    window.location.reload(false);
  };
  return (
    <Modal
      visible={props.open}
      onDismiss={props.close}
      closeAriaLabel="Close modal"
      header={orderPreview ? 'Order Preview' : 'Order Confirmed'}
    >
      {!orderPreview ? (
        <Container>
          <HelpPanel
            footer={
              <Box float="right">
                <SpaceBetween direction="horizontal" size="xxs">
                  <Button onClick={cancelOrder} variant="link">
                    Close
                  </Button>
                  <Button href="#/activity/orders/12345" variant="primary">
                    View Order Details
                  </Button>
                </SpaceBetween>
              </Box>
            }
          >
            <div>
              <ul>
                <h5>
                  You have successfully purchased {props.qty} {props.asset}
                </h5>
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
              {props.type} {props.asset}
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
                  <Button onClick={submitOrder} variant="primary">
                    Submit Order
                  </Button>
                </SpaceBetween>
              </Box>
            }
          >
            <div>
              <ul>
                <h5>Asset: {props.asset}</h5>
              </ul>
              <ul>
                <h5>Quantity: {props.qty}</h5>
              </ul>
              <ul>
                <h5>Platform Fee: $0.048</h5>
              </ul>
              <ul>
                <h5>Network Fee: $0.04</h5>
              </ul>
              <ul>
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
                    <h5>Slippage: 3%</h5>
                  </TextContent>
                </Popover>
              </ul>
              <h5 style={{ textAlign: 'right' }}>Total: $0.04</h5>
            </div>
          </HelpPanel>
        </Container>
      )}
    </Modal>
  );
}

export default TradeModal;
