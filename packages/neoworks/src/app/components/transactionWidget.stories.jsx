import TransactionWidget from './transactionWidget';

export default {
  component: TransactionWidget,
  title: 'TransactionWidget',
};

const Template = (args) => <TransactionWidget {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
