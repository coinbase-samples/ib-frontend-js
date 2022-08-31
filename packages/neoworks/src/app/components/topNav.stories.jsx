import TopNav from './topNav';

export default {
  component: TopNav,
  title: 'TopNav',
};

const Template = (args) => <TopNav {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
