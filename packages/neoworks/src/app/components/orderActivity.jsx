import * as React from 'react';
import { OrderContext } from '../context/ordersContext';
import { useContext, useEffect } from 'react';
import { Icons } from '../utils/Icons';
import { AuthContext } from '../context/authContext';

import _ from 'lodash';
import {
  Header,
  Table,
  Link,
  Box,
  SpaceBetween,
  TextFilter,
} from '@cloudscape-design/components';

export function OrderActivity(props) {
  let searchOptions = false;
  let filteredOrders;
  const {
    orders,
    ordersLoading: ordersLoaded,
    fetchOrders,
  } = useContext(OrderContext);

  const { sessionInfo, attrInfo } = useContext(AuthContext);
  const sub = attrInfo.find((a) => a.Name === 'sub')?.Value;
  const [filteringText, setFilteringText] = React.useState('');

  useEffect(() => {
    if (!ordersLoaded && orders?.length === 0) {
      fetchOrders(sessionInfo.accessToken, sub);
    }
  }, [orders, ordersLoaded, fetchOrders, sessionInfo.accessToken, sub]);

  if (props.asset) {
    filteredOrders = _.filter(orders, { productId: props.asset });
    searchOptions = false;
  }

  if (filteringText) {
    console.log(filteringText);
    filteredOrders = _.filter(orders, { productId: filteringText });
    console.log(filteredOrders);
  }

  return [
    <SpaceBetween size="l">
      <Table
        filter={
          searchOptions ? (
            <TextFilter
              filteringPlaceholder="Search Orders"
              filteringText={filteringText}
              onChange={({ detail }) => setFilteringText(detail.filteringText)}
            />
          ) : (
            <p>searching not available</p>
          )
        }
        columnDefinitions={[
          {
            id: 'product_id',
            header: 'Asset',
            cell: (e) => <Icons asset={e.productId} />,
            sortingField: 'product_id',
          },
          {
            id: 'side',
            header: 'Side',
            cell: (item) => item.side || '-',
            sortingField: 'side',
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
        items={filteredOrders ? filteredOrders : orders}
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
