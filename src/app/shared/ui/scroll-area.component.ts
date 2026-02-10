import { Component, Input } from '@angular/core';
import { NgClass } from '@angular/common';

@Component({
  selector: 'ui-scroll-area',
  standalone: true,
  imports: [NgClass],
  template: `
    <div [ngClass]="['relative overflow-auto', className]" [style.max-height]="maxHeight">
      <ng-content />
    </div>
  `,
})
export class ScrollAreaComponent {
  @Input() maxHeight = '100%';
  @Input() className = '';
}
