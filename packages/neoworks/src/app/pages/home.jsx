import { Container, Grid, Header, Link } from '@cloudscape-design/components';

import { BalanceChart } from '../components/balanceChart';
import { TransactionWidget } from '../components/transactionWidget';
import { YourAssets } from '../components/yourAssets';
// const { sessionInfo } = useContext(AuthContext);

export function Home() {
  return (
    //grids hold containers
    <Grid
      gridDefinition={[
        { colspan: { default: 7, xxs: 8 } },
        { colspan: { default: 4, xxs: 4 } },
        { colspan: { default: 12, xxs: 12 } },
      ]}
    >
      <Container
        header={
          <Header variant="h2" description="$113,757.17">
            Total Balance
          </Header>
        }
      >
        <BalanceChart />
      </Container>
      <Container>
        <TransactionWidget />
      </Container>
      <Container
        header={
          <Link href="#/portfolio" variant="h2">
            View Full Portfolio
          </Link>
        }
      >
        <YourAssets />
      </Container>
    </Grid>
  );
}
