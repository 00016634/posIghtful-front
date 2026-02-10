import { Component, Input, forwardRef } from '@angular/core';
import { NgClass } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'ui-switch',
  standalone: true,
  imports: [NgClass],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SwitchComponent),
      multi: true,
    },
  ],
  template: `
    <button
      type="button"
      role="switch"
      [attr.aria-checked]="checked"
      [ngClass]="[
        'peer inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50',
        checked ? 'bg-primary' : 'bg-switch-background',
        className
      ]"
      [disabled]="isDisabled"
      (click)="toggle()"
    >
      <span
        [ngClass]="[
          'pointer-events-none block h-4 w-4 rounded-full bg-background shadow-lg ring-0 transition-transform',
          checked ? 'translate-x-4' : 'translate-x-0'
        ]"
      ></span>
    </button>
  `,
})
export class SwitchComponent implements ControlValueAccessor {
  @Input() className = '';

  checked = false;
  isDisabled = false;
  onChange: (value: boolean) => void = () => {};
  onTouched: () => void = () => {};

  toggle() {
    this.checked = !this.checked;
    this.onChange(this.checked);
    this.onTouched();
  }

  writeValue(value: boolean) {
    this.checked = !!value;
  }

  registerOnChange(fn: (value: boolean) => void) {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void) {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean) {
    this.isDisabled = isDisabled;
  }
}
