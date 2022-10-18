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
  let assetLanding = false;
  const {
    orders,
    sortOrders,
    ordersLoading: ordersLoaded,
    fetchOrders,
  } = useContext(OrderContext);

  const { sessionInfo } = useContext(AuthContext);
  //const sub = attrInfo.find((a) => a.Name === 'sub')?.Value;
  const [filteringText, setFilteringText] = React.useState('');
  const [currentPageIndex, setCurrentPageIndex] = React.useState(0);
  let showPagination = false;
  const { asset } = props;
  let orderTotal = orders.length;

  useEffect(() => {
    if (!ordersLoaded && orders?.length === 0) {
      fetchOrders(sessionInfo.accessToken);
      searchOptions = false;
    }
  }, [orders]);

  const buildPageCount = (orderTotal) => {
    if (orderTotal > 10) {
      pageCount = orderTotal / 10;
      showPagination = true;
    } else {
      pageCount = 0;
      showPagination = false;
    }
  };

  let pageCount;

  if (props.asset) {
    assetLanding = true;
    const filter = asset + '_USD';
    filteredOrders = _.filter(orders, { productId: filter });
    searchOptions = false;
    orderTotal = filteredOrders.length;
  }

  buildPageCount(orderTotal);
  const paginateOrders = (currentPageIndex) => {
    const type = assetLanding ? filteredOrders : orders;

    if (currentPageIndex === 0) {
      return type.slice(0, 9);
    }
    if (currentPageIndex === 1) {
      return type.slice(10, 19);
    }

    if (currentPageIndex === 2) {
      return type.slice(20, 29);
    }
    if (currentPageIndex === 3) {
      return type.slice(30, 39);
    }
    if (currentPageIndex === 4) {
      return type.slice(40, 49);
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
      {showPagination ? (
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
      ) : (
        ''
      )}
    </SpaceBetween>,
  ];
}

export default OrderActivity;
