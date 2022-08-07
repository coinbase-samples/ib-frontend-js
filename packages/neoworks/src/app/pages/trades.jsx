import {
  Container,
  Grid,
  Header,
  Button,
  SpaceBetween,
} from '@cloudscape-design/components';
import * as React from 'react';
import TradeableAssets from '../components/tradeableAssets';
import TransactionWidget from '../components/transactionWidget';

/* eslint-disable-next-line */

// const StyledHome = styled.div`
//   color: blue;
// `;

export function Trades(props) {
  return (
    <Grid
      gridDefinition={[
        { colspan: { default: 9, xxs: 8 } },
        { colspan: { default: 5, xxs: 4 } },
      ]}
    >
      <Container
        variant="stacked"
        header={
          <Header
            variant="h2"
            actions={
              <SpaceBetween direction="horizontal" size="m"></SpaceBetween>
            }
          >
            Tradeable Assets
          </Header>
        }
      >
        <TradeableAssets />
      </Container>
      <Container
        // footer={
        //     <Link
        //     href="#/trades"
        //     variant="footer"
        //     >
        //       View Full Portfolio
        //     </Link>
        //   }
        variant="stacked"
        actions={<SpaceBetween direction="vertical" size="xs"></SpaceBetween>}
      >
        <TransactionWidget />
      </Container>
    </Grid>
  );
}

export default Trades;
