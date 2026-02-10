import { Component, Input } from '@angular/core';
import { NgClass } from '@angular/common';

@Component({
  selector: 'ui-card',
  standalone: true,
  imports: [NgClass],
  template: `
    <div [ngClass]="['rounded-xl border bg-card text-card-foreground shadow', className]">
      <ng-content />
    </div>
  `,
})
export class CardComponent {
  @Input() className = '';
}

@Component({
  selector: 'ui-card-header',
  standalone: true,
  imports: [NgClass],
  template: `
    <div [ngClass]="['flex flex-col space-y-1.5 p-6', className]">
      <ng-content />
    </div>
  `,
})
export class CardHeaderComponent {
  @Input() className = '';
}

@Component({
  selector: 'ui-card-title',
  standalone: true,
  imports: [NgClass],
  template: `
    <h3 [ngClass]="['font-semibold leading-none tracking-tight', className]">
      <ng-content />
    </h3>
  `,
})
export class CardTitleComponent {
  @Input() className = '';
}

@Component({
  selector: 'ui-card-description',
  standalone: true,
  imports: [NgClass],
  template: `
    <p [ngClass]="['text-sm text-muted-foreground', className]">
      <ng-content />
    </p>
  `,
})
export class CardDescriptionComponent {
  @Input() className = '';
}

@Component({
  selector: 'ui-card-content',
  standalone: true,
  imports: [NgClass],
  template: `
    <div [ngClass]="['p-6 pt-0', className]">
      <ng-content />
    </div>
  `,
})
export class CardContentComponent {
  @Input() className = '';
}

@Component({
  selector: 'ui-card-footer',
  standalone: true,
  imports: [NgClass],
  template: `
    <div [ngClass]="['flex items-center p-6 pt-0', className]">
      <ng-content />
    </div>
  `,
})
export class CardFooterComponent {
  @Input() className = '';
}
