import BalanceChart from './balanceChart';

export default {
  component: BalanceChart,
  title: 'BalanceChart',
};

const Template = (args) => <BalanceChart {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
