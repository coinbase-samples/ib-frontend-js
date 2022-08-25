import AssetLanding from './assetLandingPage';

export default {
  component: AssetLanding,
  title: 'AssetLanding',
};

const Template = (args) => <AssetLanding {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
