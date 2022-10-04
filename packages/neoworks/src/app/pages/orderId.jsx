import * as React from 'react';
import { OrderContext } from '../context/ordersContext';
import { useContext, useEffect } from 'react';
import { Icons } from '../utils/Icons';

import {
  Container,
  Cards,
  Header,
  Button,
  SpaceBetween,
  HelpPanel,
  ColumnLayout,
} from '@cloudscape-design/components';
import { useParams } from 'react-router-dom';
import CancelOrderModal from '../components/cancelOrderModal';

export function OrderId() {
  const [orderInvalid, setOrderInvalid] = React.useState(false);
  const [showCancelModal, setShowCancelModal] = React.useState(false);
  const { orderId } = useParams();
  const { orderLoading, fetchOrderById, fetchOrderDetails, orderDetail } =
    useContext(OrderContext);

  const getOrderDetails = async () => {
    try {
      const orderDetailResponse = await fetchOrderById(orderId);
      console.log('order detail context ', orderDetailResponse);
      if (!orderDetail) {
        console.log('no order found', orderDetailResponse);
        setOrderInvalid(true);
      } else {
        console.log('order found', orderDetailResponse);
        setOrderInvalid(false);
      }
    } catch (e) {
      console.log(e);
    }
  };
  const currentOrderDetail = orderDetail;
  const currentOrderId = currentOrderDetail?.orderId;
  const orderMatch = orderId === currentOrderId;
  // console.log(currentOrderDetail, orderId, currentOrderId, orderMatch);

  useEffect(() => {
    if (orderMatch) {
      console.log('order matched');
      setOrderInvalid(false);
      return;
    } else if (!orderMatch && currentOrderDetail) {
      console.log(
        'an order in state exists but doesnt match URI ',
        currentOrderId
      );

      getOrderDetails();
    } else {
      console.log('checking api if order exists.');
      getOrderDetails();
    }
  }, [orderDetail, currentOrderDetail]);

  const status = orderDetail?.status;
  const openCancelModal = () => {
    setShowCancelModal(true);
  };
  const closeCancelModal = () => {
    setShowCancelModal(false);
  };
  return !orderInvalid && !orderLoading ? (
    <Container
      header={
        <Header
          variant="h3"
          description=""
          actions={
            <SpaceBetween direction="horizontal" size="xs">
              {status === 'ORDER_STATUS_PENDING' ? (
                <Button onClick={openCancelModal} variant="secondary">
                  Cancel Order
                </Button>
              ) : (
                ''
              )}
            </SpaceBetween>
          }
        >
          <Icons asset={orderDetail?.productId} /> Order Details
        </Header>
      }
    >
      <Cards
        loading={fetchOrderDetails}
        loadingText="Loading Your Order Details"
        ariaLabels={{
          itemSelectionLabel: (e, t) => `select ${t.name}`,
          selectionGroupLabel: 'Item selection',
        }}
        cardDefinition={{
          sections: [
            {
              id: 'Details',
              name: 'Details',
              content: (item) => (
                <HelpPanel
                  // header="Trade Details"
                  loading={orderLoading}
                  loadingText="Loading Order Details"
                >
                  <ColumnLayout
                    variant="text-grid"
                    borders="horizontal"
                    columns={2}
                    loading={orderLoading}
                    loadingText="Loading Order Details"
                  >
                    <h5>Transaction Id: </h5>

                    {orderDetail?.orderId}
                    <h5>Created At:</h5>

                    {orderDetail?.createdAt}
                    <h5>Side:</h5>

                    {orderDetail?.side}
                    <h5>Type</h5>

                    {orderDetail?.type}
                    <h5> Base Quantity:</h5>

                    {orderDetail?.quantity}
                    <h5> Filled Quantity:</h5>

                    {orderDetail?.filledQuantity}
                    <h5>Status:</h5>

                    {orderDetail?.status}
                  </ColumnLayout>
                </HelpPanel>
              ),
            },
          ],
        }}
        cardsPerRow={[{ cards: 1 }, { minWidth: 300, cards: 1 }]}
        items={[
          {
            size: 'Small',
            id: 'orderDetails',
            name: 'orderDetails',
          },
        ]}
        empty={<p>No profile info</p>}
      />
      <Cards
        loading={orderLoading}
        loadingText="Loading Your Fee Details"
        ariaLabels={{
          itemSelectionLabel: (e, t) => `select ${t.name}`,
          selectionGroupLabel: 'Item selection',
        }}
        cardDefinition={{
          sections: [
            {
              id: 'Fees',
              name: 'Fees',
              content: (item) => (
                <HelpPanel header={<h5>Fees</h5>}>
                  <ColumnLayout
                    variant="text-grid"
                    borders="horizontal"
                    columns={2}
                  >
                    <h5>Commission: </h5>
                    {orderDetail?.commission}
                    <h5>Exchange Fee: </h5>
                    {orderDetail?.exchangeFee}
                  </ColumnLayout>
                </HelpPanel>
              ),
            },
          ],
        }}
        cardsPerRow={[{ cards: 1 }, { minWidth: 300, cards: 1 }]}
        items={[
          {
            size: 'Small',
            id: 'Fees',
            name: 'Fees',
          },
        ]}
        empty={<p>No profile info</p>}
      />
      <CancelOrderModal open={showCancelModal} close={closeCancelModal} />
    </Container>
  ) : (
    <Container
      header={
        <Header variant="h3" description="">
          <Icons asset={orderDetail?.productId} /> Order Details
        </Header>
      }
    >
      <Cards
        loading={orderLoading}
        loadingText="Searching for Order"
        ariaLabels={{
          itemSelectionLabel: (e, t) => `select ${t.name}`,
          selectionGroupLabel: 'Item selection',
        }}
        cardDefinition={{
          sections: [
            {
              id: 'NoOrder',
              name: 'NoOrder',
              content: (item) => (
                <ColumnLayout columns={3}>
                  <h3>Order {orderId} Not Found </h3>
                </ColumnLayout>
              ),
            },
          ],
        }}
        cardsPerRow={[{ cards: 1 }, { minWidth: 300, cards: 1 }]}
        items={[
          {
            size: 'Small',
            id: 'Fees',
            name: 'Fees',
          },
        ]}
        empty={<p>No profile info</p>}
      />
    </Container>
  );
}

export default OrderId;
