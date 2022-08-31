import OrderActivity from './orderActivity';

export default {
  component: OrderActivity,
  title: 'OrderActivity',
};

const Template = (args) => <OrderActivity {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
