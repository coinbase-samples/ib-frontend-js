import * as React from 'react';
import { OrderContext } from '../context/ordersContext';
import { useState, useContext, useEffect } from 'react';
import { Icons } from '../utils/Icons';
import _ from 'lodash';

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

export function OrderId(props) {
  const { orderId } = useParams();

  const {
    orders,
    orderDetail,
    orderLoading,
    fetchOrderById,
    fetchOrderDetails,
  } = useContext(OrderContext);

  // console.log(orderMatch );
  useEffect(() => {
    const orderExists = orders?.orders?.find((o) => o.order_id === orderId);
    console.log(orderDetail);
    console.log(orderDetail);
    const currentOrderId = orderDetail?.clientOrderId;
    console.log(orderExists);
    console.log(currentOrderId);
    const orderMatch = orderId === currentOrderId;
    console.log(orderMatch);

    if (orderMatch) {
      console.log('order  found. Not making api request');
      return;
    } else if (!orderMatch && orderExists) {
      console.log('order exists', orderExists);
      return;
    } else {
      const getOrderDetails = async () => {
        console.log('order not found.  making api request');
        const response = await fetchOrderById(orderId);
        return response;
      };

      getOrderDetails();
    }
  }, [orderDetail, orderId, fetchOrderById, orderDetail]);

  const status = 'open';
  return (
    <Container
      header={
        <Header
          variant="h3"
          description=""
          actions={
            <SpaceBetween direction="horizontal" size="xs">
              {status === 'open' ? (
                <Button variant="primary">Cancel</Button>
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
                  header="Trade Details"
                  loading={orderLoading}
                  loadingText="Loading Order Details"
                >
                  <ColumnLayout
                    borders="horizontal"
                    columns={3}
                    loading={orderLoading}
                    loadingText="Loading Order Details"
                  >
                    <h5>Transaction Id: </h5>{' '}
                    <p>{orderDetail?.clientOrderId}</p>
                    <h5>Created At: </h5>{' '}
                    <p>{orderDetail?.order?.created_at}</p>
                    <h5>Side:</h5> <p>{orderDetail?.side}</p>
                    <h5>Type</h5> <p>{orderDetail?.order?.type}</p>
                    <h5> Base Quantity:</h5>{' '}
                    <p>{orderDetail?.order?.base_quantity}</p>
                    <h5> Filled Quantity:</h5>{' '}
                    <p>{orderDetail?.filledQuantity}</p>
                    <h5>Status:</h5> <p>{orderDetail?.status}</p>
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
                  <ColumnLayout borders="horizontal" columns={3}>
                    <h5>Commission: </h5> <p>{orderDetail?.commission}</p>
                    <h5>Exchange Fee: </h5> <p>{orderDetail?.exchangeFee}</p>
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
    </Container>
  );
}

export default OrderId;
