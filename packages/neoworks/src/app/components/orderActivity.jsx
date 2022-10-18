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
  const {
    orders,
    sortOrders,
    ordersLoading: ordersLoaded,
    fetchOrders,
    paginatedOrders,
  } = useContext(OrderContext);

  const { sessionInfo } = useContext(AuthContext);
  //const sub = attrInfo.find((a) => a.Name === 'sub')?.Value;
  const [filteringText, setFilteringText] = React.useState('');
  const [currentPageIndex, setCurrentPageIndex] = React.useState(0);
  const assetLanding = props.asset;
  useEffect(() => {
    if (!ordersLoaded && orders?.length === 0) {
      let filtered;
      if (assetLanding) {
        filtered = true;
        fetchOrders(sessionInfo.accessToken, props.asset, filtered);
        searchOptions = false;
      } else {
        filtered = false;
        fetchOrders(sessionInfo.accessToken);
      }
    }
  }, [orders]);

  const buildPageCount = (orderTotal) => {
    if (orderTotal > 10) {
      pageCount = orderTotal / 10;
    } else {
      pageCount = 0;
    }
  };

  let pageCount;
  const orderTotal = paginatedOrders.length;
  buildPageCount(orderTotal);
  const paginateOrders = (currentPageIndex) => {
    if (currentPageIndex === 0) {
      return paginatedOrders.slice(0, 9);
    }
    if (currentPageIndex === 1) {
      return paginatedOrders.slice(10, 19);
    }

    if (currentPageIndex === 2) {
      return paginatedOrders.slice(20, 29);
    }
    if (currentPageIndex === 3) {
      return paginatedOrders.slice(30, 39);
    }
    if (currentPageIndex === 4) {
      return paginatedOrders.slice(40, 49);
    }
  };

  const setPagination = (detail) => {
    setCurrentPageIndex(detail.currentPageIndex);
    paginateOrders(detail.currentPageIndex);
  };
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
            width: 100,
            minWidth: 100,
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
        items={paginateOrders(currentPageIndex)}
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
        onChange={({ detail }) => setPagination(detail)}
        openEnd
        pagesCount={pageCount}
      />
    </SpaceBetween>,
  ];
}

export default OrderActivity;
