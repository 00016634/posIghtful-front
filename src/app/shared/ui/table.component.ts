import { Component, Input } from '@angular/core';
import { NgClass } from '@angular/common';

@Component({
  selector: 'ui-table',
  standalone: true,
  imports: [NgClass],
  template: `
    <div class="relative w-full overflow-auto">
      <table [ngClass]="['w-full caption-bottom text-sm', className]">
        <ng-content />
      </table>
    </div>
  `,
})
export class TableComponent {
  @Input() className = '';
}

@Component({
  selector: 'ui-table-header',
  standalone: true,
  imports: [NgClass],
  template: `
    <thead [ngClass]="['[&_tr]:border-b', className]">
      <ng-content />
    </thead>
  `,
})
export class TableHeaderComponent {
  @Input() className = '';
}

@Component({
  selector: 'ui-table-body',
  standalone: true,
  imports: [NgClass],
  template: `
    <tbody [ngClass]="['[&_tr:last-child]:border-0', className]">
      <ng-content />
    </tbody>
  `,
})
export class TableBodyComponent {
  @Input() className = '';
}

@Component({
  selector: 'ui-table-row',
  standalone: true,
  imports: [NgClass],
  template: `
    <tr [ngClass]="['border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted', className]">
      <ng-content />
    </tr>
  `,
})
export class TableRowComponent {
  @Input() className = '';
}

@Component({
  selector: 'ui-table-head',
  standalone: true,
  imports: [NgClass],
  template: `
    <th [ngClass]="['h-10 px-2 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]', className]">
      <ng-content />
    </th>
  `,
})
export class TableHeadComponent {
  @Input() className = '';
}

@Component({
  selector: 'ui-table-cell',
  standalone: true,
  imports: [NgClass],
  template: `
    <td [ngClass]="['p-2 align-middle [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]', className]">
      <ng-content />
    </td>
  `,
})
export class TableCellComponent {
  @Input() className = '';
}
