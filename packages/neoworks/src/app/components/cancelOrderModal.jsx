import * as React from 'react';
import { Icons } from '../utils/Icons';
import { OrderContext } from '../context/ordersContext';
import { useContext } from 'react';
import {
  Modal,
  HelpPanel,
  Container,
  Header,
  Box,
  SpaceBetween,
  Button,
  ColumnLayout,
} from '@cloudscape-design/components';

export function CancelOrderModal(props) {
  const { currentOrder, cancelOrderLoading, orderDetail, placeCancelOrder } =
    useContext(OrderContext);

  const [cancelOrderPreview, setCancelOrderPreview] = React.useState(false);
  let orderFail = false;
  const submitCancelOrder = async () => {
    setCancelOrderPreview(false);

    await placeCancelOrder();
  };

  const closeModal = () => {
    //add an if check to ensure api finishes
    setCancelOrderPreview(true);
    props.close();
  };

  const cancelOrderClose = () => {
    window.location.reload(false);
  };

  const cancelOrderResponse = () => {
    if (orderDetail?.code) {
      orderFail = true;
      console.log('should be true ', orderFail);
      return (
        <p>
          We're sorry, your request to Cancel Failed. Reason:{' '}
          {orderDetail?.message}
        </p>
      );
    }
    return (
      <p>
        {' '}
        Congrats, we successfully cancelled your order.
        {props.asset}.
      </p>
    );
  };

  console.log(props.open);
  return (
    <Modal
      visible={props.open}
      onDismiss={closeModal}
      closeAriaLabel="Close modal"
      header={
        cancelOrderPreview ? 'Order Cancellation Confirm' : 'Order Status'
      }
    >
      {!cancelOrderPreview ? (
        <Container>
          <HelpPanel
            loading={cancelOrderLoading}
            loadingText="Cancelling your Order."
            footer={
              <Box float="right">
                <SpaceBetween direction="horizontal" size="xxs">
                  <Button onClick={cancelOrderClose} variant="link">
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
                <p>{cancelOrderResponse()}</p>
              </ul>
            </div>
          </HelpPanel>
        </Container>
      ) : (
        <Container
          header={
            <Header variant="h3" description="">
              <Icons asset={props.asset} />
            </Header>
          }
        >
          <HelpPanel
            footer={
              <Box float="right">
                <SpaceBetween direction="horizontal" size="xs">
                  {/* <Button onClick={cancelOrderClose} variant="link">
                    Cancel
                  </Button> */}
                  <Button onClick={submitCancelOrder} variant="primary">
                    Cancel Order
                  </Button>
                </SpaceBetween>
              </Box>
            }
          >
            <ColumnLayout borders="horizontal" columns={3}>
              <h4>Are you sure you want to cancel?</h4>
            </ColumnLayout>
          </HelpPanel>
        </Container>
      )}
    </Modal>
  );
}

export default CancelOrderModal;
