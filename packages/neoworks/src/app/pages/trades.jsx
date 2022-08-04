import { Container, Grid, Header, Button, SpaceBetween } from '@cloudscape-design/components';
import { TradeableAssets} from '../components/tradeableAssets'
import * as React from "react";

/* eslint-disable-next-line */

// const StyledHome = styled.div`
//   color: blue;
// `;


export function Trades(props) {
  return (
    
    <Grid

    gridDefinition={[
      { colspan: { default: 3, xxs: 9 } },
      { colspan: { default: 9, xxs: 3 } }
    ]}
  >
    <Container
            header={
                <Header
                  variant="h2"
                  actions={
                    <SpaceBetween
                      direction="horizontal"
                      size="xs"
                    >
                
                    </SpaceBetween>
                  }
                >
                 Tradeable Assets
                </Header>
              }
            >
                <TradeableAssets />

            </Container>
  </Grid>
 
  );
}

export default Trades;
