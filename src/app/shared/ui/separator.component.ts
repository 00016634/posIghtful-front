import { Component, Input } from '@angular/core';
import { NgClass } from '@angular/common';

@Component({
  selector: 'ui-separator',
  standalone: true,
  imports: [NgClass],
  template: `
    <div
      role="separator"
      [ngClass]="[
        'shrink-0 bg-border',
        orientation === 'horizontal' ? 'h-[1px] w-full' : 'h-full w-[1px]',
        className
      ]"
    ></div>
  `,
})
export class SeparatorComponent {
  @Input() orientation: 'horizontal' | 'vertical' = 'horizontal';
  @Input() className = '';
}
