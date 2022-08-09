import {
  Container,
  Grid,
  Header,
  SpaceBetween,
  Button,
  Link,
} from '@cloudscape-design/components';

import { BalanceChart } from '../components/balanceChart';
import { YourAssets } from '../components/yourAssets';

export function Home() {
  return (
    //grids hold containers
    <Grid
      gridDefinition={[
        { colspan: { default: 9, xxs: 8 } },
        { colspan: { default: 5, xxs: 4 } },
      ]}
    >
      <Container
        header={
          <Header
            variant="h2"
            description="$113,757.17"
            actions={
              <SpaceBetween direction="horizontal" size="xs">
                <Button>Send & Receive</Button>
              </SpaceBetween>
            }
          >
            Total Balance
          </Header>
        }
      >
        <BalanceChart />
      </Container>
      <Container
        footer={
          <Link href="#/trades" variant="footer">
            View Full Portfolio
          </Link>
        }
        header={<Header variant="h2">Your Assets</Header>}
      >
        <YourAssets />
      </Container>
      <Container
        header={
          <Header
            variant="h2"
            description="News"
            actions={
              <SpaceBetween direction="horizontal" size="xs">
                <Button>Action</Button>
                <Button>Another action</Button>
              </SpaceBetween>
            }
          >
            News
          </Header>
        }
      >
        Container contentContainer contentContainer contentContainer
        contentContainer contentContainer contentContainer contentContainer
        contentContainer contentContainer contentContainer contentContainer
        contentContainer contentContainer contentContainer contentContainer
        contentContainer contentContainer contentContainer contentContainer
        contentContainer contentContainer contentContainer contentContainer
        contentContainer contentContainer contentContainer contentContainer
        contentContainer contentContainer contentContainer contentContainer
        contentContainer contentContainer contentContainer contentContainer
        contentContainer contentContainer contentContainer contentContainer
        content Container contentContainer contentContainer contentContainer
        contentContainer contentContainer contentContainer contentContainer
        contentContainer contentContainer contentContainer contentContainer
        contentContainer contentContainer contentContainer contentContainer
        contentContainer contentContainer contentContainer contentContainer
        contentContainer contentContainer contentContainer contentContainer
        contentContainer contentContainer contentContainer contentContainer
        contentContainer contentContainer contentContainer contentContainer
        contentContainer contentContainer contentContainer contentContainer
        contentContainer contentContainer contentContainer contentContainer
        content Container contentContainer contentContainer contentContainer
        contentContainer contentContainer contentContainer contentContainer
        contentContainer contentContainer contentContainer contentContainer
        contentContainer contentContainer contentContainer contentContainer
        contentContainer contentContainer contentContainer contentContainer
        contentContainer contentContainer contentContainer contentContainer
        contentContainer contentContainer contentContainer contentContainer
        contentContainer contentContainer contentContainer contentContainer
        contentContainer contentContainer contentContainer contentContainer
        contentContainer contentContainer contentContainer contentContainer
        content Container contentContainer contentContainer contentContainer
        contentContainer contentContainer contentContainer contentContainer
        contentContainer contentContainer contentContainer contentContainer
        contentContainer contentContainer contentContainer contentContainer
        contentContainer contentContainer contentContainer contentContainer
        contentContainer contentContainer contentContainer contentContainer
        contentContainer contentContainer contentContainer contentContainer
        contentContainer contentContainer contentContainer contentContainer
        contentContainer contentContainer contentContainer contentContainer
        contentContainer contentContainer contentContainer contentContainer
        content
      </Container>
    </Grid>
  );
}
