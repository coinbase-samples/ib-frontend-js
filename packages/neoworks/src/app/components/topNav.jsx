import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import TopNavigation from '@cloudscape-design/components/top-navigation';

import { AuthContext } from '../context/authContext';
import logo from '../../assets/neo_white.png';

export default function TopNav() {
  const navigate = useNavigate();
  const { sessionInfo, signOut } = useContext(AuthContext);

  const onMenuClick = (e) => {
    if (e.detail.id === 'signout') {
      signOut();
      navigate('/signin');
    }
  };

  return (
    <TopNavigation
      identity={{
        href: '#',
        // title: "Neoworks",
        logo: {
          src: logo,
          alt: 'logo',
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
          text: sessionInfo.username,
          description: sessionInfo.email,
          iconName: 'user-profile',
          onItemClick: onMenuClick,
          items: [
            { id: 'profile', text: 'Profile', href: '#/Profile' },
            {
              id: 'signout',
              text: 'Sign out',
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
