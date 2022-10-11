import { Container, Grid, Header, Link } from '@cloudscape-design/components';
import { useContext } from 'react';
import { PortfolioChart } from '../components/portfolioChart';
import { TransactionWidget } from '../components/transactionWidget';
import { YourAssets } from '../components/yourAssets';
import { PortfolioContext } from '../context/portfolioContext';
import _ from 'lodash';

export function Home() {
  const { portfolio } = useContext(PortfolioContext);
  let balanceLoaded = false;
  let loadedBalance;

  const calculateBalance = () => {
    // const calculatedBalance = _.sumBy(portfolio, (asset) => {
    //   return asset.balance;
    // });
    let calculatedBalance;
    portfolio.forEach((element) => {
      calculatedBalance = element.balance;
    });
    // const calculatedBalance = '14';
    return calculatedBalance;
  };

  if (portfolio) {
    loadedBalance = calculateBalance();
    balanceLoaded = true;
  }
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
