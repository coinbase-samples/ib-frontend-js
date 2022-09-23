import { Container, Grid, Header, Link } from '@cloudscape-design/components';
import { useContext } from 'react';
import { BalanceChart } from '../components/balanceChart';
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
    console.log('calculated Balance ' + calculatedBalance);
    return calculatedBalance;
  };

  if (portfolio) {
    loadedBalance = calculateBalance();
    console.log('loaded balance ', loadedBalance);
    balanceLoaded = true;
  }
  console.log(portfolio);
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
