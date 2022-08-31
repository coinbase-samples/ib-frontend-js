import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Router } from './routes';

export default {
  component: Router,
  title: 'Router',
} as ComponentMeta<typeof Router>;

const Template: ComponentStory<typeof Router> = (args) => <Router {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
