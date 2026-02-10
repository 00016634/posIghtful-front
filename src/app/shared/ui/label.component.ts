import { Component, Input } from '@angular/core';
import { NgClass } from '@angular/common';

@Component({
  selector: 'ui-label',
  standalone: true,
  imports: [NgClass],
  template: `
    <label [ngClass]="['text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70', className]" [attr.for]="htmlFor">
      <ng-content />
    </label>
  `,
})
export class LabelComponent {
  @Input() htmlFor = '';
  @Input() className = '';
}
