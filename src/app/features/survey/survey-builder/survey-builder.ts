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
import { finalize } from 'rxjs';
import { isEqual } from 'lodash';

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
  isLoading = false;

  Plus = Plus;
  ArrowLeft = ArrowLeft;

  private formSnapshot: any = null;
  hasUnsavedChanges = false;
  isSaving = false;

  ngOnInit() {
    this.surveyId = this.route.snapshot.paramMap.get('id');
    if (!this.surveyId) return;

    this.isLoading = true;
    this.surveyService
      .getSurvey(this.surveyId)
      .pipe(
        finalize(() => {
          this.isLoading = false;
          this.cdr.markForCheck();
        }),
      )
      .subscribe((data) => {
        this.buildForm(data);
         this.trackUnsavedChanges();
      });
  }

  onBack = () => {
    this.router.navigate(['/surveys']);
  };

  onSave = () => {
    this.saveSurvey();
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

  removeQuestion = (i: number) => {
    this.questions.removeAt(i);
  };

  moveQuestionUp = (i: number) => {
    if (i === 0) return;
    const q = this.questions.at(i);
    this.questions.removeAt(i);
    this.questions.insert(i - 1, q);
  };

  moveQuestionDown = (i: number) => {
    if (i === this.questions.length - 1) return;
    const q = this.questions.at(i);
    this.questions.removeAt(i);
    this.questions.insert(i + 1, q);
  };

  saveSurvey = () => {
    if (!this.surveyId) return;

    if (!this.surveyForm.valid) {
      this.surveyForm.markAllAsTouched();
      return;
    }

    this.isSaving = true;
    this.cdr.markForCheck();

    const payload = formToSurveyDto(this.surveyForm, this.surveyId);

    this.surveyService.updateSurvey(this.surveyId, payload).subscribe(() => {
      this.formSnapshot = payload;
      this.hasUnsavedChanges = false;
      this.isSaving = false;
      this.cdr.markForCheck();
    });
  };

  private trackUnsavedChanges() {
    if (!this.surveyId) return;

    this.formSnapshot = this.surveyForm.getRawValue();

    this.surveyForm.valueChanges
      .subscribe(() => {
        const current = this.surveyForm.getRawValue();
        const changed = !isEqual(current, this.formSnapshot);

        if (changed === this.hasUnsavedChanges) return;

        this.hasUnsavedChanges = changed;
        this.cdr.markForCheck();
      });
  }


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
