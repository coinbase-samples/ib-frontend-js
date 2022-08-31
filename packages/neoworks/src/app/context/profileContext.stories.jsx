import ProfileProvider from './profileContext';

export default {
  component: ProfileProvider,
  title: 'ProfileProvider',
};

const Template = (args) => <ProfileProvider {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
