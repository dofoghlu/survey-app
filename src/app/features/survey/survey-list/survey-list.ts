import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Survey } from '../models/survey';
import { SurveyService } from '../services/survey.service';
import { EmptyState } from '../../../shared/components/empty-state/empty-state';
import { finalize } from 'rxjs';
import { SurveyItem } from '../survey-item/survey-item';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, Plus } from 'lucide-angular';

@Component({
  selector: 'app-survey-list',
  standalone: true,
  imports: [EmptyState, SurveyItem, CommonModule, LucideAngularModule],
  templateUrl: './survey-list.html',
})
export class SurveyList {
  private surveyService = inject(SurveyService);
  private cdr = inject(ChangeDetectorRef);
  private router = inject(Router);

  surveys: Survey[] = [];
  isCreating = false;
  isLoading = false;

  Plus = Plus;

  ngOnInit() {
    this.loadSurveys();
  }

  private loadSurveys = () => {
    this.isLoading = true;
    this.cdr.markForCheck();

    this.surveyService
      .getSurveys()
      .pipe(
        finalize(() => {
          this.isLoading = false;
          this.cdr.markForCheck();
        })
      )
      .subscribe({
        next: (data) => {
          this.surveys = data;
        },
        error: () => {},
      });
  };

  onCreate = () => {
    this.isCreating = true;
    this.cdr.markForCheck();

    this.surveyService
      .createSurvey({ questions: [] })
      .pipe(
        finalize(() => {
          this.isCreating = false;
          this.cdr.markForCheck();
        })
      )
      .subscribe({
        next: () => this.loadSurveys(),
        error: () => {},
      });
  };

  onEdit(survey: Survey) {
    this.router.navigate(['/surveys', survey.id]);
  }
}
