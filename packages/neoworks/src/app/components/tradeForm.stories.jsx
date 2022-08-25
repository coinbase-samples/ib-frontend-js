import TradeForm from './tradeForm';

export default {
  component: TradeForm,
  title: 'TradeForm',
};

const Template = (args) => <TradeForm {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
