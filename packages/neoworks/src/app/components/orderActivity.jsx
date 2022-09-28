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
  Pagination,
} from '@cloudscape-design/components';

export function OrderActivity(props) {
  let searchOptions = true;
  let filteredOrders;
  const {
    orders,
    sortOrders,
    ordersLoading: ordersLoaded,
    fetchOrders,
  } = useContext(OrderContext);

  const { sessionInfo, attrInfo } = useContext(AuthContext);
  const sub = attrInfo.find((a) => a.Name === 'sub')?.Value;
  const [filteringText, setFilteringText] = React.useState('');
  const [currentPageIndex, setCurrentPageIndex] = React.useState(1);

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
    filteredOrders = _.filter(orders, { productId: filteringText });
  }

  const handleSort = (event) => {
    sortOrders(event);
  };

  return [
    <SpaceBetween size="l">
      <Table
        resizableColumns={true}
        trackBy="orderId"
        sortingDescending
        onSortingChange={handleSort}
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
            id: 'orderId',
            header: 'Order Id',
            cell: (e) => (
              <Link href={`#/activity/orders/${e.orderId}`}>{e.orderId}</Link>
            ),
          },
          {
            id: 'productId',
            header: 'Asset',
            cell: (e) => <Icons asset={e.productId} />,
            sortingField: 'productId',
            width: 85,
            minWidth: 85,
          },
          {
            id: 'side',
            header: 'Side',
            cell: (item) => item.side || '-',
            sortingField: 'side',
          },
          {
            id: 'quantity',
            header: 'Qty',
            cell: (item) => item.quantity || '-',
            sortingField: 'quantity',
            width: 85,
            minWidth: 85,
          },
          {
            id: 'createdAt',
            header: 'Order Date',
            cell: (item) => item.createdAt || '-',
            sortingField: 'createdAt',
          },
        ]}
        items={filteredOrders ? filteredOrders : orders}
        loading={ordersLoaded}
        loadingText="Loading Orders"
        empty={
          <Box textAlign="center" color="inherit">
            <b>No Orders Found</b>
          </Box>
        }
        header={<Header> Order History </Header>}
      />
      <Pagination
        ariaLabels={{
          nextPageLabel: 'Next page',
          previousPageLabel: 'Previous page',
          pageLabel: (pageNumber) => `Page ${pageNumber} of all pages`,
        }}
        currentPageIndex={currentPageIndex}
        onChange={({ detail }) => setCurrentPageIndex(detail.currentPageIndex)}
        openEnd
        pagesCount={5}
      />
    </SpaceBetween>,
  ];
}

export default OrderActivity;
