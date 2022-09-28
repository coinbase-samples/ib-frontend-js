import Trades from './trades';

export default {
  component: Trades,
  title: 'Trades',
};

const Template = (args) => <Trades {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
