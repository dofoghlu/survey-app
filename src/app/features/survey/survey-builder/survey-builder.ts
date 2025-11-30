import { Component } from '@angular/core';
import { QuestionEditor } from '../question-editor/question-editor';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { Survey } from '../models/survey';
import { createQuestionFormGroup, createSurveyForm } from '../utils/survey-form-builder';

@Component({
  selector: 'app-survey-builder',
  imports: [QuestionEditor],
  templateUrl: './survey-builder.html',
})
export class SurveyBuilder {
  surveyForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.buildForm();
  }

  buildForm(survey?: Survey) {    
    this.surveyForm = createSurveyForm(this.fb, survey);
  }

  get questions(): FormArray<FormGroup> {
    return this.surveyForm.get('questions') as FormArray<FormGroup>;
  }

  addQuestion() {
     this.questions.push(createQuestionFormGroup(this.fb));
  }
}
