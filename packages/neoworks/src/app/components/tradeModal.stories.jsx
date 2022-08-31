import TradeModal from './tradeModal';

export default {
  component: TradeModal,
  title: 'TradeModal',
};

const Template = (args) => <TradeModal {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
