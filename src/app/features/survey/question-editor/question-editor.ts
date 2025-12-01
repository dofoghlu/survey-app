import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { QUESTION_TYPES, QuestionType } from '../constants/question-type';
import { TextFieldModule } from '@angular/cdk/text-field';
import { Switch } from '../../../shared/components/switch/switch';
import { Dropdown } from '../../../shared/components/dropdown/dropdown';
import { LucideAngularModule, MoveUp, MoveDown, Trash } from 'lucide-angular';

@Component({
  selector: 'app-question-editor',
  imports: [ReactiveFormsModule, TextFieldModule, Switch, Dropdown, LucideAngularModule],
  standalone: true,
  templateUrl: './question-editor.html',
})
export class QuestionEditor {
  @Input() index!: number;
  @Input() questionForm!: FormGroup;

  @Output() remove = new EventEmitter<void>();
  @Output() moveUp = new EventEmitter<void>();
  @Output() moveDown = new EventEmitter<void>();

  MoveUp = MoveUp;
  MoveDown = MoveDown;
  Trash = Trash;

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
