import { Routes } from '@angular/router';
import { SurveyBuilder } from './features/survey/survey-builder/survey-builder';
import { Welcome } from './features/auth/welcome/welcome';
import { emailGuard } from './features/auth/email.guard';
import { SurveyList } from './features/survey/survey-list/survey-list';
import { NotFound } from './shared/components/not-found/not-found';
import { UnsavedChangesGuard } from './core/guards/unsaved-changes.guard';

export const routes: Routes = [
  { path: 'welcome', component: Welcome },
  { path: '', pathMatch: 'full', redirectTo: 'surveys' },

  {
    path: '',
    canActivateChild: [emailGuard],
    children: [
      { path: 'surveys', component: SurveyList },
      { path: 'surveys/:id', component: SurveyBuilder, canDeactivate: [UnsavedChangesGuard] },
      { path: '404', component: NotFound },
      { path: '**', component: NotFound },
    ],
  },
];
