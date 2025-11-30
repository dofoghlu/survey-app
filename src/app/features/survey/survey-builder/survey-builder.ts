import { Component } from '@angular/core';
import { QuestionEditor } from '../question-editor/question-editor';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Question } from '../models/question';
import { Survey } from '../models/survey';

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
    this.surveyForm = this.fb.group({
      id: [survey?.id || null],
      title: [survey?.title || null, Validators.required],
      description: [survey?.description || null],
      questions: this.fb.array(survey?.questions?.map((q) => this.createQuestion(q)) || []),
    });

    if ((this.surveyForm.get('questions') as FormArray).length === 0) {
      this.addQuestion();
    }
  }

  createQuestion(question?: Question): FormGroup {
    return this.fb.group({
      questionId: [question?.questionId || 0],
      questionText: [question?.questionText || null, Validators.required],
      mandatoryInd: [question?.mandatoryInd || false],
      questionType: [question?.questionType || 1],
      options: [question?.options || []],
      randomizeOptionsInd: [question?.randomizeOptionsInd || false],
      cards: [question?.cards || []],
      programmerNotes: [question?.programmerNotes || null],
      instructions: [question?.instructions || null],
    });
  }

  get questions(): FormArray<FormGroup> {
    return this.surveyForm.get('questions') as FormArray<FormGroup>;
  }

  addQuestion() {
    this.questions.push(this.createQuestion());
  }
}
