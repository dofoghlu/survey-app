import { Component, forwardRef, Input, input, model } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { NgpMenu, NgpMenuItem, NgpMenuTrigger } from 'ng-primitives/menu';
import { LucideAngularModule, ChevronDown } from 'lucide-angular';

@Component({
  selector: 'app-dropdown',
  imports: [
    NgpMenu,
    NgpMenuItem,
    NgpMenuTrigger,
    LucideAngularModule,
  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => Dropdown),
      multi: true,
    },
  ],
  templateUrl: './dropdown.html',
})
export class Dropdown<T = any> implements ControlValueAccessor {
  @Input({ required: true }) items!: ReadonlyArray<{ label: string; value: T }>;
  @Input() selected?: T;
  @Input() label = 'Select an option';

  readonly ChevronDown = ChevronDown;

  searchTerm = '';

  private onChange: (value: T | undefined) => void = () => {};
  private onTouched: () => void = () => {};

  writeValue = (value: T | undefined) => {
    this.selected = value;
  };

  registerOnChange(fn: (value: T | undefined) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  get selectedItem() {
    return this.items.find((i) => i.value === this.selected) ?? null;
  }

  get filteredItems() {
    const t = this.searchTerm.toLowerCase();
    return this.items.filter((i) => i.label.toLowerCase().includes(t));
  }

  selectItem = (item: { label: string; value: T }) => {
    this.selected = item.value;
    this.onChange(item.value);
    this.onTouched();
  };

  onSearch = (e: Event) => {
    this.searchTerm = (e.target as HTMLInputElement).value;
  };

  clearSearch = () => (this.searchTerm = '');
}
