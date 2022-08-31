import Home from './home';

export default {
  component: Home,
  title: 'Home',
};

const Template = (args) => <Home {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
