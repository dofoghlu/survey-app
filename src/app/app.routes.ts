import { Routes } from '@angular/router';
import { SurveyBuilder } from './features/survey/survey-builder/survey-builder';
import { Welcome } from './features/auth/welcome';
import { emailGuard } from './features/auth/email.guard';
import { SurveyList } from './features/survey/survey-list/survey-list';

export const routes: Routes = [
  { path: 'welcome', component: Welcome },
  { path: '', pathMatch: 'full', redirectTo: 'surveys' },
  {
    path: 'surveys',
    canActivate: [emailGuard],
    component: SurveyList,
  },
  {
    canActivate: [emailGuard],
    path: 'surveys/new',
    component: SurveyBuilder,
  },
  {
    canActivate: [emailGuard],
    path: 'surveys/:id',
    component: SurveyBuilder,
  },
];
