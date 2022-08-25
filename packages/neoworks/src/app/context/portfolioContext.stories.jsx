import PortfolioProvider from './portfolioContext';

export default {
  component: PortfolioProvider,
  title: 'PortfolioProvider',
};

const Template = (args) => <PortfolioProvider {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
