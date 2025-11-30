import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { QuestionEditor } from '../question-editor/question-editor';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { Survey } from '../models/survey';
import { createQuestionFormGroup, createSurveyForm } from '../utils/survey-form-builder';
import { ActivatedRoute } from '@angular/router';
import { SurveyService } from '../services/survey.service';

@Component({
  selector: 'app-survey-builder',
  imports: [QuestionEditor],
  templateUrl: './survey-builder.html',
})
export class SurveyBuilder {
  private route = inject(ActivatedRoute);
  private cdr = inject(ChangeDetectorRef);
  private surveyService = inject(SurveyService);
  private fb = inject(FormBuilder);

  surveyForm: FormGroup = createSurveyForm(this.fb);

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) return;

    this.surveyService.getSurvey(id).subscribe((data) => {
      this.buildForm(data);
      this.cdr.detectChanges();
    });
  }

  buildForm(survey?: Survey) {
    console.log('Building survey form with data:', survey);
    this.surveyForm = createSurveyForm(this.fb, survey);
  }

  get questions(): FormArray<FormGroup> {
    return this.surveyForm.get('questions') as FormArray<FormGroup>;
  }

  addQuestion() {
    if (!this.questions.valid) {
      this.questions.markAllAsTouched();
      return;
    }

    this.questions.push(createQuestionFormGroup(this.fb));
  }
}
