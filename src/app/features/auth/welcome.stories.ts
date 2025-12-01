import type { Meta, StoryObj } from '@storybook/angular';
import { Welcome } from './welcome';

const meta: Meta<Welcome> = {
  component: Welcome,
};

export default meta;

type Story = StoryObj<Welcome>;

export const Default: Story = {};