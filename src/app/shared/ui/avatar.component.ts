import { Component, Input } from '@angular/core';
import { NgClass, NgIf } from '@angular/common';

@Component({
  selector: 'ui-avatar',
  standalone: true,
  imports: [NgClass, NgIf],
  template: `
    <span [ngClass]="['relative flex shrink-0 overflow-hidden rounded-full', sizeClass, className]">
      <img
        *ngIf="src && !imgError"
        [src]="src"
        [alt]="alt"
        class="aspect-square h-full w-full object-cover"
        (error)="imgError = true"
      />
      <span
        *ngIf="!src || imgError"
        class="flex h-full w-full items-center justify-center rounded-full bg-muted text-sm font-medium"
      >
        {{ fallback }}
      </span>
    </span>
  `,
})
export class AvatarComponent {
  @Input() src = '';
  @Input() alt = '';
  @Input() fallback = '';
  @Input() size: 'sm' | 'md' | 'lg' = 'md';
  @Input() className = '';

  imgError = false;

  get sizeClass(): string {
    switch (this.size) {
      case 'sm': return 'h-8 w-8';
      case 'lg': return 'h-12 w-12';
      default: return 'h-10 w-10';
    }
  }
}
