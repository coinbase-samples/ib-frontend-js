import OrderProvider from './ordersContext';

export default {
  component: OrderProvider,
  title: 'OrderProvider',
};

const Template = (args) => <OrderProvider {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
