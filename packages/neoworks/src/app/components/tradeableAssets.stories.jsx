import TradeableAssets from './tradeableAssets';

export default {
  component: TradeableAssets,
  title: 'TradeableAssets',
};

const Template = (args) => <TradeableAssets {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
