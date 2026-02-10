import { Component, Input } from '@angular/core';
import { NgClass } from '@angular/common';

@Component({
  selector: 'ui-progress',
  standalone: true,
  imports: [NgClass],
  template: `
    <div [ngClass]="['relative h-2 w-full overflow-hidden rounded-full bg-primary/20', className]">
      <div
        class="h-full w-full flex-1 bg-primary transition-all"
        [style.transform]="'translateX(-' + (100 - (value ?? 0)) + '%)'"
      ></div>
    </div>
  `,
})
export class ProgressComponent {
  @Input() value: number | null = 0;
  @Input() className = '';
}
