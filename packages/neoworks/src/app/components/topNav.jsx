import * as React from 'react';
import TopNavigation from '@cloudscape-design/components/top-navigation';
import { LoginModal } from './loginModal';

export default function TopNav() {
  return (
    <TopNavigation
      identity={{
        href: '#',
        // title: "Neoworks",
        logo: {
          src: 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iNDNweCIgaGVpZ2h0PSIzMXB4IiB2aWV3Qm94PSIwIDAgNDMgMzEiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICAgIDxnIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIiBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPgogICAgICAgIDxyZWN0IGZpbGw9IiMyMzJmM2UiIHN0cm9rZT0iI2Q1ZGJkYiIgeD0iMC41IiB5PSIwLjUiIHdpZHRoPSI0MiIgaGVpZ2h0PSIzMCIgcng9IjIiPjwvcmVjdD4KICAgICAgICA8dGV4dCBmb250LWZhbWlseT0iQW1hem9uRW1iZXItUmVndWxhciwgQW1hem9uIEVtYmVyIiBmb250LXNpemU9IjEyIiBmaWxsPSIjRkZGRkZGIj4KICAgICAgICAgICAgPHRzcGFuIHg9IjkiIHk9IjE5Ij5Mb2dvPC90c3Bhbj4KICAgICAgICA8L3RleHQ+CiAgICA8L2c+Cjwvc3ZnPgo=',
          alt: 'Service',
        },
      }}
      utilities={[
        {
          type: 'button',
          text: 'Buy/Sell',
          href: '#/trades',
        },
        {
          type: 'button',
          iconName: 'notification',
          title: 'Notifications',
          ariaLabel: 'Notifications (unread)',
          badge: true,
          disableUtilityCollapse: false,
        },

        {
          type: 'menu-dropdown',
          text: 'Jay Prix',
          description: 'jay.parisi@neoworks.com',
          iconName: 'user-profile',
          // onItemClick: <LoginModal />,
          items: [
            { id: 'profile', text: 'Profile', href: '#/Profile' },
            { id: 'signout', text: 'Sign out' },
            {
              id: 'login',
              text: 'Login',
              onItemClick: <LoginModal showLogin="true" />,
            },
          ],
        },
      ]}
      i18nStrings={{
        searchIconAriaLabel: 'Search',
        searchDismissIconAriaLabel: 'Close search',
        overflowMenuTriggerText: 'More',
        overflowMenuTitleText: 'All',
        overflowMenuBackIconAriaLabel: 'Back',
        overflowMenuDismissIconAriaLabel: 'Close menu',
      }}
    />
  );
}
