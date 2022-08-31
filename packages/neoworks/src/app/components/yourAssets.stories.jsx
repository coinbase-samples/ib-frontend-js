import YourAssets from './yourAssets';

export default {
  component: YourAssets,
  title: 'YourAssets',
};

const Template = (args) => <YourAssets {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
