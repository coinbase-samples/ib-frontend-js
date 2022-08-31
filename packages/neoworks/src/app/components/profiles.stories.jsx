import { PureProfile } from './profiles';

export default {
  component: PureProfile,
  title: 'Profile',
  argTypes: {
    updateClicked: { action: 'update' },
    editClicked: { action: 'edit' },
    closeUpdateProfileModal: { action: 'close modal' },
    showUpdateProfileModal: { action: 'open modal' },
  },
};

const Template = (args) => <PureProfile {...args} />;
export const Loading = Template.bind({});
Loading.args = { profileLoading: true };

export const Loaded = Template.bind({});
Loaded.args = {
  profileLoading: false,
  userProfile: {
    userId: 1,
    name: 'Jay Parisi',
    email: 'jay.parisi@coinbase.com',
    roles: ['user', 'admin'],
    username: 'jprix',
    address: '123 Happy Canyon Way, Denver',
    legalName: 'Jay Parisi',
    dateOfBirth: '1/23/2001',
  },
};
