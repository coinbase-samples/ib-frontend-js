import TransferForm from './transferForm';

export default {
  component: TransferForm,
  title: 'TransferForm',
};

const Template = (args) => <TransferForm {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
