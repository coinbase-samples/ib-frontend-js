import { ComponentStory, ComponentMeta } from '@storybook/react';
import { AuthProvider } from './authContext';

export default {
  component: AuthProvider,
  title: 'AuthProvider',
} as ComponentMeta<typeof AuthProvider>;

const Template: ComponentStory<typeof AuthProvider> = (args) => (
  <AuthProvider {...args} />
);

export const Primary = Template.bind({});
Primary.args = {};
