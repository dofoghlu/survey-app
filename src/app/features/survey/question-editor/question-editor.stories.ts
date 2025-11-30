import { Meta, StoryObj } from '@storybook/angular';
import { QuestionEditor } from './question-editor';
import { FormBuilder } from '@angular/forms';
import { mockNewQuestion, mockSingleChoiceQuestion } from './question.test-data';
import { createQuestionFormGroup } from '../utils/survey-form-builder';
import { QuestionType } from '../constants/question-type';
import { expect, userEvent, within } from 'storybook/test';

const fb = new FormBuilder();

const meta: Meta<QuestionEditor> = {
  component: QuestionEditor,
};

export default meta;
type Story = StoryObj<QuestionEditor>;

export const Empty: Story = {
  render: () => {
    return {
      props: { questionForm: createQuestionFormGroup(fb, mockNewQuestion) },
    };
  },
};

export const SingleChoice: Story = {
  render: () => {
    return {
      props: { questionForm: createQuestionFormGroup(fb, mockSingleChoiceQuestion) },
    };
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await expect(canvas.getByRole('textbox', { name: /options/i })).toBeDefined();
    await expect(canvas.getByRole('checkbox', { name: /randomize options/i })).toBeDefined();
  },
};

export const SingleLineInput: Story = {
  render: () => ({
    props: {
      questionForm: createQuestionFormGroup(fb, {
        ...mockNewQuestion,
        questionType: QuestionType.SingleLineInput,
      }),
    },
  }),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await expect(canvas.queryByRole('textbox', { name: /options/i })).toBeNull();
    await expect(canvas.queryByRole('checkbox', { name: /randomize options/i })).toBeNull();
  },
};

export const InvalidOptions: Story = {
  render: () => ({
    props: { questionForm: createQuestionFormGroup(fb, mockNewQuestion) },
  }),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const textarea = canvas.getByRole('textbox', { name: /options/i });

    await userEvent.type(textarea, '- valid\ninvalid');

    await userEvent.tab();

    await expect(
      canvas.getByText(/all lines must start with "-"/i)
    ).toBeDefined();
  },
};

export const InsufficientOptions: Story = {
  render: () => ({
    props: { questionForm: createQuestionFormGroup(fb, mockNewQuestion) },
  }),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const textarea = canvas.getByRole('textbox', { name: /options/i });

    await userEvent.type(textarea, '- Option 1');

    await userEvent.tab();

    await expect(
      canvas.getByText(/at least 2 options are required./i)
    ).toBeDefined();
  },
};

