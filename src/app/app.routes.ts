import { Routes } from '@angular/router';
import { SurveyBuilder } from './features/survey/survey-builder/survey-builder';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'surveys/new',
  },
  {
    path: 'surveys/new',
    component: SurveyBuilder,
  },
  {
    path: 'surveys/:id',
    component: SurveyBuilder,
  },
];
