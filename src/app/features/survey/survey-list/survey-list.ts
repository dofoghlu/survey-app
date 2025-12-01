import { ChangeDetectorRef, Component, inject, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Survey } from '../models/survey';
import { SurveyService } from '../services/survey.service';
import { EmptyState } from '../../../shared/components/empty-state/empty-state';
import { finalize } from 'rxjs';
import { SurveyItem } from "../survey-item/survey-item";

@Component({
  selector: 'app-survey-list',
  standalone: true,
  imports: [EmptyState, SurveyItem],
  templateUrl: './survey-list.html',
})
export class SurveyList {
  private surveyService = inject(SurveyService);
  private cdr = inject(ChangeDetectorRef);
  private router = inject(Router);

  surveys: Survey[] = [];
  surveyPendingDelete?: Survey;
  isCreating = false;

  ngOnInit() {
    this.surveyService.getSurveys().subscribe((data) => {
      this.surveys = data;
      this.cdr.detectChanges();
    });
  }

  onCreate = () => {
    this.isCreating = true;
    this.cdr.detectChanges();

    this.surveyService
      .createSurvey({})
      .pipe(
        finalize(() => {
          this.isCreating = false;
          this.cdr.detectChanges();
        }),
      )
      .subscribe({
        next: (created) => this.router.navigate(['/surveys', created.id]),
        error: () => {},
      });
  };

  onEdit(survey: Survey) {
    this.router.navigate(['/surveys', survey.id]);
  }

  onDelete(survey: Survey) {
  }
}
