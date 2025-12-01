import { Meta, StoryObj } from '@storybook/angular';
import { QuestionEditor } from './question-editor';
import { FormBuilder } from '@angular/forms';
import {
  mockNewQuestion,
  mockSingleChoice,
  mockMultipleChoice,
  mockDropdownList,
} from '../test-data/question.test-data';
import { createQuestionFormGroup } from '../utils/survey-form-builder';
import { QuestionType } from '../constants/question-type';
import { expect, userEvent, within } from 'storybook/test';

const fb = new FormBuilder();

const meta: Meta<QuestionEditor> = {
  component: QuestionEditor,
};

export default meta;
type Story = StoryObj<QuestionEditor>;

export const NewQuestion: Story = {
  render: () => {
    return {
      props: {
        index: 0,
        questionForm: createQuestionFormGroup(fb, mockNewQuestion),
      },
    };
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await expect(canvas.getByRole('switch', { name: /required/i })).toHaveAttribute(
      'aria-checked',
      'false',
    );
    await expect(canvas.getByRole('switch', { name: /randomize options/i })).toHaveAttribute(
      'aria-checked',
      'false',
    );
  },
};

export const SingleChoice: Story = {
  render: () => {
    return {
      props: {
        index: 0,
        questionForm: createQuestionFormGroup(fb, mockSingleChoice),
      },
    };
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByRole('combobox')).toHaveTextContent(/single choice/i);
  },
};

export const MultipleChoice: Story = {
  render: () => {
    return {
      props: {
        index: 0,
        questionForm: createQuestionFormGroup(fb, mockMultipleChoice),
      },
    };
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByRole('combobox')).toHaveTextContent(/multiple choice/i);
  },
};

export const SingleLineInput: Story = {
  render: () => ({
    props: {
      index: 0,
      questionForm: createQuestionFormGroup(fb, {
        ...mockNewQuestion,
        questionType: QuestionType.SingleLineInput,
      }),
    },
  }),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await expect(canvas.queryByRole('textbox', { name: /options/i })).toBeNull();
    await expect(canvas.queryByRole('switch', { name: /randomize options/i })).toBeNull();
  },
};

export const DropdownList: Story = {
  render: () => {
    return {
      props: {
        index: 0,
        questionForm: createQuestionFormGroup(fb, mockDropdownList),
      },
    };
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByRole('combobox')).toHaveTextContent(/dropdown list/i);
  },
};

export const RequiredAndRandomizeOptions: Story = {
  render: () => {
    return {
      props: {
        index: 0,
        questionForm: createQuestionFormGroup(fb, {
          ...mockSingleChoice,
          mandatoryInd: true,
          randomizeOptionsInd: true,
        }),
      },
    };
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await expect(canvas.getByRole('switch', { name: /required/i })).toHaveAttribute(
      'aria-checked',
      'true',
    );
    await expect(canvas.getByRole('switch', { name: /randomize options/i })).toHaveAttribute(
      'aria-checked',
      'true',
    );
  },
};

export const InvalidOptions: Story = {
  render: () => ({
    props: {
      index: 0,
      questionForm: createQuestionFormGroup(fb, mockNewQuestion),
    },
  }),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const textarea = canvas.getByRole('textbox', { name: /options/i });

    await userEvent.type(textarea, '- valid\ninvalid');

    await userEvent.tab();

    await expect(canvas.getByText(/all lines must start with "-"/i)).toBeDefined();
  },
};

export const InsufficientOptions: Story = {
  render: () => ({
    props: {
      index: 0,
      questionForm: createQuestionFormGroup(fb, mockNewQuestion),
    },
  }),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const textarea = canvas.getByRole('textbox', { name: /options/i });

    await userEvent.type(textarea, '- Option 1');

    await userEvent.tab();

    await expect(canvas.getByText(/at least 2 options are required./i)).toBeDefined();
  },
};
