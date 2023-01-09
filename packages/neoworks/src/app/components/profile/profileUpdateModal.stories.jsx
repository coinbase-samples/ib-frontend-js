import { PureUpdateProfileModal } from './profileUpdateModal';
export default {
  component: PureUpdateProfileModal,
  title: 'Update Profile Modal',
  argTypes: {
    submitUpdateProfile: {
      action: 'profile updated',
    },
  },
};
export const ModelLoaded = {
  args: (ModelLoaded.args = {
    userProfile: {
      userId: 1,
      name: 'Johnyy  Cyrpto',
      email: 'johnny.crypto @crizzy.oi',
      roles: ['user', 'admin'],
      username: 'jcrypto',
      address: '123 Happy Canyon Way, Denver',
      legalName: 'Johnyy  Cyrpto',
      dateOfBirth: '1/23/2001',
    },
  }),
};
