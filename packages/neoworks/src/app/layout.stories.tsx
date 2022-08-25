import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Layout } from './layout';

export default {
  component: Layout,
  title: 'Layout',
} as ComponentMeta<typeof Layout>;

const Template: ComponentStory<typeof Layout> = (args) => <Layout {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
