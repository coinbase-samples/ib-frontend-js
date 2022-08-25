import AssetProvider from './assetsContext';

export default {
  component: AssetProvider,
  title: 'AssetProvider',
};

const Template = (args) => <AssetProvider {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
