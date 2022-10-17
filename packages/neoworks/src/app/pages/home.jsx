import { Container, Grid, Header, Link } from '@cloudscape-design/components';
import { useContext } from 'react';
import { PortfolioChart } from '../components/portfolioChart';
import { TransactionWidget } from '../components/transactionWidget';
import { YourAssets } from '../components/yourAssets';
import { PortfolioContext } from '../context/portfolioContext';

export function Home() {
  const { portfolio } = useContext(PortfolioContext);
  let balanceLoaded = false;
  let loadedBalance;

  const calculateBalance = () => {
    // const calculatedBalance = _.sumBy(portfolio, (asset) => {
    //   return asset.balance;
    // });
    const calculatedBalance = 1000;
    // portfolio.forEach((element) => {
    //   calculatedBalance = element.balance;
    // });
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
      id="homeDashboard"
      gridDefinition={[
        // { colspan: { default: 8, m: 8, l: 12 } },
        // { colspan: { default: 4, m: 4, l: 12 } },
        // { colspan: { default: 12, xxs: 12 } },
        { colspan: { l: 8, m: 8, default: 8 } },
        { colspan: { l: 4, m: 8, default: 4 } },
        { colspan: { l: 12, m: 8, default: 12 } },
      ]}
    >
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
