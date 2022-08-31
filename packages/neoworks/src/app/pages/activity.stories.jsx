import Activity from './activity';

export default {
  component: Activity,
  title: 'Activity',
};

const Template = (args) => <Activity {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
