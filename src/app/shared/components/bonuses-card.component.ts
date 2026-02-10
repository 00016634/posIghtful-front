import { Component, Input } from '@angular/core';
import { NgIf } from '@angular/common';
import { CardComponent, CardContentComponent, CardHeaderComponent, CardTitleComponent } from '../ui/card.component';

@Component({
  selector: 'app-bonuses-card',
  standalone: true,
  imports: [NgIf, CardComponent, CardContentComponent, CardHeaderComponent, CardTitleComponent],
  template: `
    <ui-card>
      <ui-card-header>
        <ui-card-title>{{ title }}</ui-card-title>
      </ui-card-header>
      <ui-card-content>
        <div class="space-y-2">
          <div class="flex justify-between">
            <span class="text-sm text-muted-foreground">Total Earned</span>
            <span class="font-semibold">{{ totalEarned }}</span>
          </div>
          <div class="flex justify-between">
            <span class="text-sm text-muted-foreground">Pending</span>
            <span class="font-semibold">{{ pending }}</span>
          </div>
          <div *ngIf="paid" class="flex justify-between">
            <span class="text-sm text-muted-foreground">Paid</span>
            <span class="font-semibold text-green-600">{{ paid }}</span>
          </div>
        </div>
      </ui-card-content>
    </ui-card>
  `,
})
export class BonusesCardComponent {
  @Input() title = 'Bonuses';
  @Input() totalEarned = '';
  @Input() pending = '';
  @Input() paid = '';
}
