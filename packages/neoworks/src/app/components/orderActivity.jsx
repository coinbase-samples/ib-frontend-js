import * as React from 'react';
import {
  Input,
  Header,
  Table,
  Link,
  Box,
  Button,
  Container,
  SpaceBetween,
} from '@cloudscape-design/components';

export function OrderActivity() {
  const orderId = '12345';
  const [value, setValue] = React.useState('');
  return [
    <SpaceBetween size="l">
      <Input type="search" placeholder="Search Orders" ariaLabel="Search" />
      <Table
        columnDefinitions={[
          {
            id: 'asset',
            header: 'Asset',
            cell: (item) => item.asset || '-',
            sortingField: 'asset',
          },
          {
            id: 'type',
            header: 'Order Type',
            cell: (item) => item.name || '-',
            sortingField: 'name',
          },
          {
            id: 'qty',
            header: 'Qty',
            cell: (item) => item.qty || '-',
            sortingField: 'qty',
          },
          {
            id: 'orderDate',
            header: 'Order Date',
            cell: (item) => item.orderDate || '-',
          },
          {
            id: 'cost',
            header: 'cost',
            cell: (item) => item.cost || '-',
          },
          {
            id: 'details',
            header: '',
            cell: (e) => (
              <Link href={`#/activity/orders/${orderId}`}>View Order</Link>
            ),
          },
        ]}
        items={[
          {
            asset: 'BTC-USD',
            name: 'Buy',
            qty: '4',
            orderDate: '08-01-2022',
            cost: '$100',
          },
          {
            asset: 'ETH-USD',
            name: 'SELL',
            qty: '4',
            orderDate: '08-03-2022',
            cost: '$50',
          },
          {
            asset: 'BTC-USD',
            name: 'Buy',
            qty: '4',
            orderDate: '08-06-2022',
            cost: '$10',
          },
          {
            asset: 'BTC-USD',
            name: 'Buy',
            qty: '4',
            orderDate: '08-01-2022',
            cost: '$100',
          },
          {
            asset: 'BTC-USD',
            name: 'Buy',
            qty: '4',
            orderDate: '08-01-2022',
            cost: '$100',
          },
          {
            asset: 'BTC-USD',
            name: 'Buy',
            qty: '4',
            orderDate: '08-09-2022',
            cost: '$100',
          },
          {
            asset: 'ETH-USD',
            name: 'SELL',
            qty: '4',
            orderDate: '08-03-2022',
            cost: '$50',
          },
          {
            asset: 'SOL-USD',
            name: 'Buy',
            qty: '4',
            orderDate: '08-01-2022',
            cost: '$100',
          },
          {
            asset: 'ETH-USD',
            name: 'SELL',
            qty: '4',
            orderDate: '08-03-2022',
            cost: '$50',
          },
          {
            asset: 'BTC-USD',
            name: 'Buy',
            qty: '4',
            orderDate: '08-01-2022',
            cost: '$100',
          },
        ]}
        loadingText="Loading resources"
        sortingDisabled
        empty={
          <Box textAlign="center" color="inherit">
            <b>No resources</b>
            <Box padding={{ bottom: 's' }} variant="p" color="inherit">
              No resources to display.
            </Box>
            <Button>Create resource</Button>
          </Box>
        }
        header={<Header> Order History </Header>}
      />
    </SpaceBetween>,
  ];
}

export default OrderActivity;
