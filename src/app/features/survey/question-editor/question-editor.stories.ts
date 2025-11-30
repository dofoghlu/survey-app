import { Meta, StoryObj } from "@storybook/angular";
import { QuestionEditor } from "./question-editor";

const meta: Meta<QuestionEditor> = {
  component: QuestionEditor,
};

export default meta;
type Story = StoryObj<QuestionEditor>;

export const Default: Story = {};
