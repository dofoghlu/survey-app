import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { QuestionType } from '../constants/question-type';
import { CommonModule } from '@angular/common';
import { parseQuestionOptions } from '../utils/survey-form-builder';

@Component({
  selector: 'app-survey-preview',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './survey-preview.html',
})
export class SurveyPreview {
  @Input() form!: FormGroup;
  QuestionType = QuestionType;

  private randomized = new WeakMap<any, string[]>();

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

  getOptions(q: any, raw: string) {
    const base = parseQuestionOptions(raw);

    if (!q.randomizeOptionsInd) return base;

    if (this.randomized.has(q)) return this.randomized.get(q)!;

    const copy = [...base];
    for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }

    this.randomized.set(q, copy);
    return copy;
  }
}
