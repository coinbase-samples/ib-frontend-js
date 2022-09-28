import { Container, Header, SpaceBetween } from '@cloudscape-design/components';
import * as React from 'react';
import { TradeableAssets } from '../components/tradeableAssets';

export function Trades(props) {
  return (
    <Container
      variant="stacked"
      header={
        <Header
          variant="h2"
          actions={
            <SpaceBetween direction="horizontal" size="l"></SpaceBetween>
          }
        >
          Tradeable Assets
        </Header>
      }
    >
      <TradeableAssets />
    </Container>
  );
}

export default Trades;
