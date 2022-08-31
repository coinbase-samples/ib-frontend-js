import Portfolio from './portfolio';

export default {
  component: Portfolio,
  title: 'Portfolio',
};

const Template = (args) => <Portfolio {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
