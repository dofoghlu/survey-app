import type { Meta, StoryObj } from '@storybook/angular';
import { expect, userEvent, within } from 'storybook/test';
import { Dropdown } from './dropdown';
import { selectFromDropdown } from '../../utils/test-steps';
import { CircleCheck } from 'lucide-angular';

const meta: Meta<Dropdown> = {
  component: Dropdown,
};

export default meta;
type Story = StoryObj<Dropdown>;

const items = [
  { label: 'Item 1', value: 1, icon: CircleCheck },
  { label: 'Item 2', value: 2, icon: CircleCheck },
];

export const Default: Story = {
  args: { items, selected: null },
};

export const Open: Story = {
  args: { items, selected: null },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    userEvent.click(canvas.getByRole('combobox'));
  },
};

export const NoResults: Story = {
  args: { items, selected: null },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await userEvent.click(canvas.getByRole('combobox'));

    const menu = within(document.body).getByRole('menu');
    await userEvent.type(within(menu).getByRole('searchbox'), 'zzz');

    await expect(within(menu).getByText(/no results/i)).toBeInTheDocument();
  },
};

export const SelectOption: Story = {
  args: { items, selected: null },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await selectFromDropdown({
      canvas,
      trigger: /select/i,
      option: /Item 1/i,
    });

    await expect(canvas.getByRole('combobox')).toHaveTextContent(/Item 1/i);
  },
};
