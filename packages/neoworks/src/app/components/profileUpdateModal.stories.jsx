import { PureUpdateProfileModal } from './profileUpdateModal';

export default {
  component: PureUpdateProfileModal,
  title: 'Update Profile Modal',
  argTypes: {
    show: { action: 'show' },
    close: { action: 'close' },
  },
};

const Template = (args) => <PureUpdateProfileModal {...args} />;
export const show = Template.bind({});
show.args = console.log('showing');

export const close = Template.bind({});
close.args = console.log('showing');
