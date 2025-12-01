import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-empty-state',
  standalone: true,
  template: `
  <div class="min-h-[60vh] p-6 flex flex-col gap-4 items-center justify-center text-gray-500">
    <p class="text-center">{{ message }}</p>
    <ng-content select="[action]"></ng-content>
  </div>
`,
})
export class EmptyState {
  @Input() message = '';
}
