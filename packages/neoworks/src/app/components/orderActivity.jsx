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
  }, []);

  if (props.asset) {
    const filter = props.asset + '_USD';
    filteredOrders = _.filter(orders, { productId: filter });
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
            ''
          )
        }
        columnDefinitions={[
          {
            id: 'orderId',
            header: 'Order Id',
            width: 100,
            minWidth: 100,
            cell: (e) => (
              <Link href={`#/activity/orders/${e.orderId}`}>View</Link>
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
            width: 200,
            minWidth: 200,
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
            width: 150,
            minWidth: 125,
          },
          {
            id: 'status',
            header: 'Order Status',
            cell: (item) => item.status || '-',
            sortingField: 'status',
            width: 150,
            minWidth: 125,
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
