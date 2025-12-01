import { Component, EventEmitter, forwardRef, Input, Output } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { NgpSwitch, NgpSwitchThumb } from 'ng-primitives/switch';

@Component({
  selector: 'app-switch',
  standalone: true,
  imports: [NgpSwitch, NgpSwitchThumb],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => Switch),
      multi: true,
    },
  ],
  template: `
    <div class="flex gap-1 items-center">
      <label class="text-sm">{{ label }}</label>

      <button
        class="relative h-5 w-9 rounded-full bg-neutral-300
         data-checked:bg-blue-500 p-0 outline-hidden
         transition duration-150 ease-in-out"
        ngpSwitch
        [ngpSwitchChecked]="value"
        (ngpSwitchCheckedChange)="onSwitchChange($event)"
        [attr.data-checked]="value ? true : null"
        [attr.aria-label]="label"
      >
        <span
          class="block h-4 w-4 translate-x-0.5 transform rounded-full bg-white ring-0 shadow
           transition-transform duration-150 ease-in-out
           data-checked:translate-x-[18px]"
          ngpSwitchThumb
        ></span>
      </button>
    </div>
  `,
})
export class Switch implements ControlValueAccessor {
  @Input() label = '';
  @Input() set checked(v: boolean) {
    this.value = !!v;
  }
  @Output() valueChange = new EventEmitter<boolean>();

  value = false;

  private onChange: (value: boolean) => void = () => {};
  private onTouched: () => void = () => {};

  writeValue(value: boolean | null): void {
    this.value = !!value;
  }

  registerOnChange(fn: (value: boolean) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  onSwitchChange(checked: boolean): void {
    this.value = checked;
    this.valueChange.emit(checked);
    this.onChange(checked);
    this.onTouched();
  }
}
