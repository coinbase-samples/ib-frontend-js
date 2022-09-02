import { PureUpdateProfileModal } from './profileUpdateModal';

export default {
  component: PureUpdateProfileModal,
  title: 'Update Profile Modal',
  argTypes: {
    submitUpdateProfile: { action: 'profile updated' },
  },
};

const Template = (args) => <PureUpdateProfileModal {...args} />;
export const ModelLoaded = Template.bind({});
ModelLoaded.args = ModelLoaded.args = {
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
