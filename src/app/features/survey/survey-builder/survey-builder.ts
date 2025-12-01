import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { QuestionEditor } from '../question-editor/question-editor';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { Survey } from '../models/survey';
import {
  createQuestionFormGroup,
  createSurveyForm,
  formToSurveyDto,
} from '../utils/survey-form-builder';
import { ActivatedRoute, Router } from '@angular/router';
import { SurveyService } from '../services/survey.service';
import { LucideAngularModule, Plus, ArrowLeft } from 'lucide-angular';

@Component({
  selector: 'app-survey-builder',
  imports: [QuestionEditor, ReactiveFormsModule, LucideAngularModule],
  templateUrl: './survey-builder.html',
})
export class SurveyBuilder {
  private route = inject(ActivatedRoute);
  private cdr = inject(ChangeDetectorRef);
  private surveyService = inject(SurveyService);
  private fb = inject(FormBuilder);
  private router = inject(Router);

  private surveyId: string | null = null;

  surveyForm: FormGroup = createSurveyForm(this.fb);

  Plus = Plus;
  ArrowLeft = ArrowLeft;

  ngOnInit() {
    this.surveyId = this.route.snapshot.paramMap.get('id');
    if (!this.surveyId) return;

    this.surveyService.getSurvey(this.surveyId).subscribe((data) => {
      this.buildForm(data);
      this.cdr.detectChanges();
    });
  }

  onBack = () => {
    this.router.navigate(['/surveys']);
  };

  buildForm(survey?: Survey) {
    this.surveyForm = createSurveyForm(this.fb, survey);
  }

  addQuestion() {
    if (!this.questions.valid) {
      this.questions.markAllAsTouched();
      return;
    }

    this.saveSurvey();
    this.questions.push(createQuestionFormGroup(this.fb));
  }

  saveSurvey = () => {
    if (!this.surveyId) return;

    const payload = formToSurveyDto(this.surveyForm, this.surveyId);

    this.surveyService.updateSurvey(this.surveyId, payload).subscribe();
  };

  get title(): FormControl {
    return this.surveyForm.get('title') as FormControl;
  }

  get description(): FormControl {
    return this.surveyForm.get('description') as FormControl;
  }

  get questions(): FormArray<FormGroup> {
    return this.surveyForm.get('questions') as FormArray<FormGroup>;
  }
}
