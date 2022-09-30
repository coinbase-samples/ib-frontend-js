import { useNavigate, Outlet } from 'react-router-dom';

import TopNav from './components/topNav';
import SideNavigation from '@cloudscape-design/components/side-navigation';
import { AppLayout } from '@cloudscape-design/components';

export const Layout = () => {
  const navigate = useNavigate();

  return (
    <>
      <TopNav />
      <AppLayout
        content={<Outlet />}
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
              { type: 'link', text: 'Assets', href: '/assets' },
              { type: 'link', text: 'Activity', href: '/activity' },
            ]}
          />
        }
      ></AppLayout>
    </>
  );
};
