import { Component, Input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { QUESTION_TYPES, QuestionType } from '../constants/question-type';
import { TextFieldModule } from '@angular/cdk/text-field';
import { Switch } from '../../../shared/components/switch/switch';

@Component({
  selector: 'app-question-editor',
  imports: [ReactiveFormsModule, TextFieldModule, Switch],
  standalone: true,
  templateUrl: './question-editor.html',
})
export class QuestionEditor {
  @Input() index!: number;
  @Input() questionForm!: FormGroup;

  questionTypes = QUESTION_TYPES;

  get questionText() {
    return this.questionForm.get('questionText');
  }

  get options() {
    return this.questionForm.get('options');
  }

  get isSingleLineInput(): boolean {
    return this.questionForm.get('questionType')?.value === QuestionType.SingleLineInput;
  }
}
