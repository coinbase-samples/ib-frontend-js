import { Container, Grid, Header } from '@cloudscape-design/components';
import { useContext } from 'react';
import { PortfolioChart } from '../components/portfolio/portfolioChart';
import { TransactionWidget } from '../components/transactionWidget';
import { YourAssets } from '../components/assets/yourAssets';
import { PortfolioContext } from '../context/portfolioContext';
import { gridDefinition } from '../utils/grid';
import '../../css/app.css';

export function Home() {
  const { portfolio } = useContext(PortfolioContext);
  let balanceLoaded = false;
  let loadedBalance;

  if (portfolio) {
    balanceLoaded = true;
  }
  return (
    //grids hold containers
    <Grid id="homeDashboard" gridDefinition={gridDefinition}>
      <Container
        className="portfolioBalanceContainer"
        loading={balanceLoaded}
        loadingText="Fetching Porfolio Balance..."
        header={
          <Header variant="h2" description={loadedBalance}>
            Portfolio Balance
          </Header>
        }
      >
        <PortfolioChart />
      </Container>
      <Container className="transactionContainer">
        <TransactionWidget />
      </Container>
      <Container
        className="portfolioContainer"
        header={<Header variant="h2">Your Portfolio</Header>}
      >
        <YourAssets />
      </Container>
    </Grid>
  );
}
