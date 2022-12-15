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
import { CancelOrderModal } from '../components/order/cancelOrderModal';

export function OrderId() {
  const [orderInvalid, setOrderInvalid] = React.useState(false);
  const [showCancelModal, setShowCancelModal] = React.useState(false);
  const { orderId } = useParams();
  const { orderLoading, fetchOrderById, fetchOrderDetails, orderDetail } =
    useContext(OrderContext);

  const getOrderDetails = async () => {
    try {
      const orderDetailResponse = await fetchOrderById(orderId);
      if (!orderDetail) {
        setOrderInvalid(true);
      } else {
        setOrderInvalid(false);
        return orderDetailResponse;
      }
    } catch (e) {
      return e;
    }
  };
  const currentOrderDetail = orderDetail;
  const currentOrderId = currentOrderDetail?.orderId;
  const orderMatch = orderId === currentOrderId;

  useEffect(() => {
    if (orderMatch) {
      setOrderInvalid(false);
      return;
    } else if (!orderMatch && currentOrderDetail) {
      getOrderDetails();
    } else {
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
              {status === 'PENDING' ? (
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
                    <h5>Time In Force:</h5>

                    {orderDetail?.timeInForce}
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
