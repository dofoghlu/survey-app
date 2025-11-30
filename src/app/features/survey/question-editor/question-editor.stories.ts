import { Meta, StoryObj } from '@storybook/angular';
import { QuestionEditor } from './question-editor';
import { FormBuilder } from '@angular/forms';
import { mockNewQuestion, mockSingleChoiceQuestion } from './question.test-data';
import { createQuestionFormGroup } from '../utils/survey-form-builder';
import { QuestionType } from '../constants/question-type';
import { expect, within } from 'storybook/test';

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
