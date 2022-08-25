import App from './app';

export default {
  component: App,
  title: 'App',
};

const Template = (args) => <App {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
