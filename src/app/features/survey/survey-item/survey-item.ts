import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Survey } from '../models/survey';

@Component({
  selector: 'app-survey-item',
  template: `
    <div class="border-default p-6">
      <div class="flex justify-between items-center">
        <h3 class="text-lg font-semibold">{{ survey.title || 'Untitled Survey' }}</h3>
        <div class="flex gap-2">
          <button
            (click)="edit.emit(survey)"
            class="text-button"
            aria-label="Edit {{ survey.title }}"
          >
            Edit
          </button>
          <button
            (click)="delete.emit(survey)"
            class="text-button "
            aria-label="Delete {{ survey.title }}"
          >
            Delete
          </button>
        </div>
      </div>
      <p class="text-primary">{{ survey.description }}</p>
      <p class="text-sm text-gray-400">{{ survey.questions.length }} questions</p>
    </div>
  `,
})
export class SurveyItem {
  @Input() survey!: Survey;
  @Output() edit = new EventEmitter<Survey>();
  @Output() delete = new EventEmitter<Survey>();
}
