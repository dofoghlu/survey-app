import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { QuestionType } from '../constants/question-type';
import { CommonModule } from '@angular/common';
import { parseQuestionOptions } from '../utils/survey-form-builder';
import { Dropdown } from "../../../shared/components/dropdown/dropdown";

@Component({
  selector: 'app-survey-preview',
  standalone: true,
  imports: [CommonModule, Dropdown],
  templateUrl: './survey-preview.html',
})
export class SurveyPreview {
  @Input() form!: FormGroup;
  QuestionType = QuestionType;

  get title() {
    return this.form.get('title')?.value;
  }

  get description() {
    return this.form.get('description')?.value;
  }

  get questions() {
    return (this.form.get('questions') as any).controls;
  }

  parseValidOptions(raw: string): string[] {
    return parseQuestionOptions(raw);
  }
}
