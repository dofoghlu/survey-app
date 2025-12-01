import { ChangeDetectorRef, Component, inject, ViewChild } from '@angular/core';
import { Router } from 'lucide-angular';
import { Survey } from '../models/survey';
import { SurveyService } from '../services/survey.service';

@Component({
  selector: 'app-survey-list',
  standalone: true,
   templateUrl: './survey-list.html',
})
export class SurveyList {
  private surveyService = inject(SurveyService);
  private cdr = inject(ChangeDetectorRef);

  surveys: Survey[] = [];
  surveyPendingDelete?: Survey;
  isCreating = false;

  ngOnInit() {
    this.surveyService.getSurveys().subscribe((data) => {
      this.surveys = data;
      this.cdr.detectChanges();
    });
  }
}
