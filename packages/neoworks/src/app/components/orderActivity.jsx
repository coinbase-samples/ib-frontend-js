import * as React from 'react';
import { OrderContext } from '../context/ordersContext';
import { useContext, useEffect } from 'react';
import { Icons } from '../utils/Icons';
import { AuthContext } from '../context/authContext';

import _ from 'lodash';
import {
  Input,
  Header,
  Table,
  Link,
  Box,
  SpaceBetween,
} from '@cloudscape-design/components';

export function OrderActivity(props) {
  let filteredOrders;
  let ordersByAsset;
  const {
    orders,
    ordersLoading: ordersLoaded,
    fetchOrders,
  } = useContext(OrderContext);

  const { sessionInfo, attrInfo } = useContext(AuthContext);
  const sub = attrInfo.find((a) => a.Name === 'sub')?.Value;

  useEffect(() => {
    if (!ordersLoaded && orders?.length === 0) {
      fetchOrders(sessionInfo.accessToken, sub);
    }
  }, [orders, ordersLoaded, fetchOrders, sessionInfo.accessToken, sub]);

  if (props.asset) {
    ordersByAsset = _.filter(orders.orders, { product_id: props.asset });
    filteredOrders = true;
  }

  return [
    <SpaceBetween size="l">
      <Input type="search" placeholder="Search Orders" ariaLabel="Search" />
      <Table
        columnDefinitions={[
          {
            id: 'product_id',
            header: 'Asset',
            cell: (e) => <Icons asset={e.productId} />,
            sortingField: 'product_id',
          },
          {
            id: 'type',
            header: 'Order Type',
            cell: (item) => item.type || '-',
            sortingField: 'type',
          },
          {
            id: 'filled_quantity',
            header: 'Qty',
            cell: (item) => item.quantity || '-',
            sortingField: 'filled_quantity',
          },
          {
            id: 'created_at',
            header: 'Order Date',
            cell: (item) => item.createdAt || '-',
          },

          {
            id: 'details',
            header: '',
            cell: (e) => (
              <Link href={`#/activity/orders/${e.clientOrderId}`}>
                View Order
              </Link>
            ),
          },
        ]}
        items={filteredOrders ? ordersByAsset : orders.orders}
        loading={ordersLoaded}
        loadingText="Loading Orders"
        sortingDisabled
        empty={
          <Box textAlign="center" color="inherit">
            <b>No Orders Found</b>
          </Box>
        }
        header={<Header> Order History </Header>}
      />
    </SpaceBetween>,
  ];
}

export default OrderActivity;
