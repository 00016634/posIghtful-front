import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-dashboard-filters',
  standalone: true,
  imports: [NgFor],
  template: `
    <div class="flex flex-wrap items-center gap-3">
      <select
        class="flex h-9 w-[160px] items-center rounded-md border border-input bg-input-background px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-1 focus:ring-ring"
        [value]="timeRange"
        (change)="onTimeRangeChange($event)"
      >
        <option value="today">Today</option>
        <option value="this_week">This Week</option>
        <option value="this_month">This Month</option>
        <option value="last_month">Last Month</option>
        <option value="this_quarter">This Quarter</option>
        <option value="this_year">This Year</option>
      </select>
      <select
        *ngIf="products.length"
        class="flex h-9 w-[200px] items-center rounded-md border border-input bg-input-background px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-1 focus:ring-ring"
        [value]="selectedProduct"
        (change)="onProductChange($event)"
      >
        <option value="">All Products</option>
        <option *ngFor="let p of products" [value]="p">{{ p }}</option>
      </select>
    </div>
  `,
})
export class DashboardFiltersComponent {
  @Input() timeRange = 'this_month';
  @Input() selectedProduct = '';
  @Input() products: string[] = [];
  @Output() timeRangeChange = new EventEmitter<string>();
  @Output() selectedProductChange = new EventEmitter<string>();

  onTimeRangeChange(event: Event) {
    const val = (event.target as HTMLSelectElement).value;
    this.timeRange = val;
    this.timeRangeChange.emit(val);
  }

  onProductChange(event: Event) {
    const val = (event.target as HTMLSelectElement).value;
    this.selectedProduct = val;
    this.selectedProductChange.emit(val);
  }
}
