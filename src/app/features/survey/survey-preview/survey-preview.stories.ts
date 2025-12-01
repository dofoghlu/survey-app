import type { Meta, StoryObj } from '@storybook/angular';
import { SurveyPreview } from './survey-preview';
import { createSurvey } from '../test-data/survey.test-data';
import {
  mockDropdownList,
  mockMultipleChoice,
  mockSingleChoice,
  mockSingleLineInput,
} from '../test-data/question.test-data';
import { createSurveyForm } from '../utils/survey-form-builder';
import { FormBuilder } from '@angular/forms';

const fb = new FormBuilder();

const meta: Meta<SurveyPreview> = {
  component: SurveyPreview,
};

export default meta;

type Story = StoryObj<SurveyPreview>;

export const Default: Story = {
  args: {
    form: createSurveyForm(
      fb,
      createSurvey({
        questions: [
          { ...mockSingleChoice, mandatoryInd: true },
          mockMultipleChoice,
          mockSingleLineInput,
          mockDropdownList,
        ],
      }),
    ),
  },
};
