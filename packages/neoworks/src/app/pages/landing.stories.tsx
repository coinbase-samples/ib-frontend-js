import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Landing } from './landing';

export default {
  component: Landing,
  title: 'Landing',
} as ComponentMeta<typeof Landing>;

const Template: ComponentStory<typeof Landing> = (args) => (
  <Landing {...args} />
);

export const Primary = Template.bind({});
Primary.args = {};
