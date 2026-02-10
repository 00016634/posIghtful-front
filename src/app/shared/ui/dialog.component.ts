import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgClass, NgIf } from '@angular/common';

@Component({
  selector: 'ui-dialog',
  standalone: true,
  imports: [NgClass, NgIf],
  template: `
    <div *ngIf="open" class="fixed inset-0 z-50 flex items-center justify-center">
      <div class="fixed inset-0 bg-black/80" (click)="onClose()"></div>
      <div [ngClass]="['relative z-50 grid w-full max-w-lg gap-4 border bg-background p-6 shadow-lg sm:rounded-lg', className]">
        <ng-content />
        <button
          class="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
          (click)="onClose()"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
        </button>
      </div>
    </div>
  `,
})
export class DialogComponent {
  @Input() open = false;
  @Input() className = '';
  @Output() openChange = new EventEmitter<boolean>();

  onClose() {
    this.open = false;
    this.openChange.emit(false);
  }
}

@Component({
  selector: 'ui-dialog-header',
  standalone: true,
  imports: [NgClass],
  template: `
    <div [ngClass]="['flex flex-col space-y-1.5 text-center sm:text-left', className]">
      <ng-content />
    </div>
  `,
})
export class DialogHeaderComponent {
  @Input() className = '';
}

@Component({
  selector: 'ui-dialog-title',
  standalone: true,
  imports: [NgClass],
  template: `
    <h2 [ngClass]="['text-lg font-semibold leading-none tracking-tight', className]">
      <ng-content />
    </h2>
  `,
})
export class DialogTitleComponent {
  @Input() className = '';
}

@Component({
  selector: 'ui-dialog-description',
  standalone: true,
  imports: [NgClass],
  template: `
    <p [ngClass]="['text-sm text-muted-foreground', className]">
      <ng-content />
    </p>
  `,
})
export class DialogDescriptionComponent {
  @Input() className = '';
}

@Component({
  selector: 'ui-dialog-footer',
  standalone: true,
  imports: [NgClass],
  template: `
    <div [ngClass]="['flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2', className]">
      <ng-content />
    </div>
  `,
})
export class DialogFooterComponent {
  @Input() className = '';
}
