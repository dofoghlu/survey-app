import { userEvent, within } from 'storybook/test';

export const selectFromDropdown = async ({
  canvas,
  trigger,
  option,
}: {
  canvas: ReturnType<typeof within>;
  trigger: string | RegExp;
  option: string | RegExp;
}) => {
  const triggerBtn = canvas.getByRole('combobox', { name: trigger });

  await userEvent.click(triggerBtn);

  const menu = within(document.body).getByRole('menu');
  const menuScope = within(menu);

  const opt = menuScope.getByText(option);
  await userEvent.click(opt);
};
