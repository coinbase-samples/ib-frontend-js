import { PureAssetLanding } from './assetLandingPage';

export default {
  component: PureAssetLanding,
  title: 'AssetLanding',
};

const Template = (args) => <PureAssetLanding {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
