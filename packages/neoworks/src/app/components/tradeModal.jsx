import * as React from 'react';
import { Icons } from '../utils/Icons';
import { tradeFee } from '../../constants';
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
  const [orderPreview, setOrderPreview] = React.useState(true);

  const submitOrder = () => {
    setOrderPreview(false);

    alert('Order Submitted');
  };
  const platformFee = tradeFee;
  const { qty, assetPrice, fiatBalance } = props;
  const orderTotal = qty * assetPrice + platformFee;

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
                    Order Details
                  </Button>
                </SpaceBetween>
              </Box>
            }
          >
            <Icons asset={props.asset} />
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
              <Icons asset={props.asset} />
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
                <h5>Payment Type: US Dollars:</h5>
              </div>
              <div>Balance: {fiatBalance}</div>
              <div>
                <h5>Total</h5>
              </div>
              <div style={{ textAlign: 'right' }}>
                <h5>${orderTotal}</h5>
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
