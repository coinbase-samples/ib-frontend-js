import * as React from 'react';
import { BalanceChart } from '../components/balanceChart';
import { useParams } from 'react-router-dom';
import { Icons } from '../utils/Icons';
import { TradeForm } from '../components/tradeForm';
import { Container, Grid, Header } from '@cloudscape-design/components';
import { OrderActivity } from './orderActivity';

export function AssetLanding() {
  const { asset } = useParams();
  return (
    <Grid
      gridDefinition={[
        { colspan: { default: 7, xxs: 7 } },
        { colspan: { default: 5, xxs: 5 } },
        { colspan: { default: 12, xxl: 12 } },
      ]}
    >
      <Container
        header={
          <Header variant="h3" description="">
            <Icons asset={asset} /> {asset} Chart
          </Header>
        }
      >
        {' '}
        <BalanceChart />
      </Container>
      <Container>
        <TradeForm asset={asset} />
      </Container>
      <Container>
        <OrderActivity asset={asset} />
      </Container>
    </Grid>
  );
}

export default AssetLanding;
