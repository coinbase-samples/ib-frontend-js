import * as React from 'react';
import { useParams } from 'react-router-dom';
import { AssetChart } from './assetChart';
import { Icons } from '../../utils/Icons';
import { TradeForm } from '../tradeForm';
import { Container, Grid, Header } from '@cloudscape-design/components';
import { OrderActivity } from '../order/orderActivity';

export function PureAssetLanding() {
  const { asset } = useParams();
  return (
    <Grid
      gridDefinition={[
        { colspan: { default: 8, m: 8, l: 8 } },
        { colspan: { default: 6, m: 4, l: 8 } },
        { colspan: { default: 12, m: 12, l: 12 } },
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
        <AssetChart asset={asset} chartType="asset" />
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

export function AssetLanding() {
  return <PureAssetLanding />;
}
export default AssetLanding;
