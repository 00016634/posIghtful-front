import { Component, Input } from '@angular/core';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-page-layout',
  standalone: true,
  imports: [NgClass],
  template: `
    <div [ngClass]="['min-h-screen bg-gray-50 p-4 md:p-8', className]">
      <ng-content />
    </div>
  `,
})
export class PageLayoutComponent {
  @Input() className = '';
}
