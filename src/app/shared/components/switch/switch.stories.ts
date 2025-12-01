import type { Meta, StoryObj } from '@storybook/angular';
import { Switch } from './switch';

const meta: Meta<Switch> = {
  component: Switch,
};

export default meta;

type Story = StoryObj<Switch>;

export const Default: Story = {
  args: {
    label: 'Enable',
  },
};