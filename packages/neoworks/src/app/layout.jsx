import * as React from 'react';
import { useNavigate } from 'react-router-dom';

import TopNav from './components/topNav';
import SideNavigation from '@cloudscape-design/components/side-navigation';
import { AppLayout, Grid } from '@cloudscape-design/components';
import { Outlet } from 'react-router-dom';

export const Layout = () => {
  const navigate = useNavigate();

  const [activeHref, setActiveHref] = React.useState('#/page1');

  return (
    <>
      <TopNav />
      <AppLayout
        content={<Outlet />}
        activeHref={activeHref}
        navigation={
          <SideNavigation
            header={{
              href: '/',
              text: 'Neoworks',
            }}
            onFollow={(event) => {
              if (!event.detail.external) {
                event.preventDefault();
                navigate(event.detail.href);
              }
            }}
            items={[
              { type: 'link', text: 'Home', href: '/' },
              { type: 'link', text: 'Trades', href: '/trades' },
              { type: 'link', text: 'Activity', href: '/activity' },
            ]}
          />
        }
      ></AppLayout>
    </>
  );
};
