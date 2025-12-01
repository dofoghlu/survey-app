import type { Meta, StoryObj } from '@storybook/angular';
import { SurveyItem } from './survey-item';
import { mockSurvey } from '../test-data/survey.test-data';

const meta: Meta<SurveyItem> = {
  component: SurveyItem,
};

export default meta;

type Story = StoryObj<SurveyItem>;

export const Default: Story = {
  args: {
    survey: mockSurvey,
  },
};