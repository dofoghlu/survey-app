import { applicationConfig, Meta, StoryObj } from '@storybook/angular';
import { SurveyBuilder } from './survey-builder';
import { http, HttpResponse } from 'msw';
import { environment } from '../../../../environments/environment';
import { SurveyService } from '../services/survey.service';
import { ActivatedRoute, convertToParamMap, provideRouter } from '@angular/router';
import { provideLocationMocks } from '@angular/common/testing';
import { mockSurvey } from '../test-data/survey.test-data';
import { expect, waitFor, within } from 'storybook/test';

const base = environment.apiUrl;
const surveyPath = SurveyService.path;

const meta: Meta<SurveyBuilder> = {
  component: SurveyBuilder,
  decorators: [
    applicationConfig({
      providers: [provideRouter([]), provideLocationMocks()],
    }),
  ],
  parameters: {
    msw: {
      handlers: [
        http.get(`${base}${surveyPath}/:id`, () => {
          return HttpResponse.json(mockSurvey);
        }),
        http.put(`${base}${surveyPath}/:id`, () => {
          return HttpResponse.json({ status: 'success' });
        }),
      ],
    },
  },
};

export default meta;
type Story = StoryObj<SurveyBuilder>;

export const New: Story = {};

export const Edit: Story = {
  decorators: [
    applicationConfig({
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: { paramMap: convertToParamMap({ id: '123' }) },
          },
        },
      ],
    }),
  ],
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await waitFor(
      async () => {
        await expect(canvas.getByRole('textbox', { name: /survey title/i })).toHaveValue('Customer Satisfaction Survey');
        await expect(canvas.getByRole('textbox', { name: /survey description/i })).toHaveValue(
          "A survey to gauge customer satisfaction levels."
        );
      }
    );
  },
};
