import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.html',
})
export class DialogComponent {
  @Input() open = false;
  @Input() title = '';
  @Input() confirmLabel = 'Confirm';
  @Input() destructive = false;

  @Output() confirm = new EventEmitter<void>();
  @Output() cancel = new EventEmitter<void>();

  onCancel = () => this.cancel.emit();
  onConfirm = () => this.confirm.emit();
}
