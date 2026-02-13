import { Component, inject, signal, computed } from '@angular/core';
import { PageLayoutComponent } from '../../shared/layouts/page-layout.component';
import {
  CardComponent, CardHeaderComponent, CardTitleComponent, CardContentComponent,
  ButtonComponent, LabelComponent, AvatarComponent, BadgeComponent,
  TableComponent, TableHeaderComponent, TableBodyComponent,
  TableRowComponent, TableHeadComponent, TableCellComponent,
} from '../../shared/ui';
import { ToastService } from '../../shared/ui/toast.service';

@Component({
  selector: 'app-accountant-dashboard',
  standalone: true,
  imports: [
    PageLayoutComponent,
    CardComponent, CardHeaderComponent, CardTitleComponent, CardContentComponent,
    ButtonComponent, LabelComponent, AvatarComponent, BadgeComponent,
    TableComponent, TableHeaderComponent, TableBodyComponent,
    TableRowComponent, TableHeadComponent, TableCellComponent,
  ],
  template: `
    <app-page-layout>
      <div class="mx-auto max-w-7xl space-y-6">
        <div>
          <h1 class="text-2xl font-semibold">Accountant - Bonus Reports</h1>
          <p class="text-sm text-muted-foreground">Generate monthly bonus payment and audit reports</p>
        </div>

        <ui-card>
          <ui-card-header>
            <ui-card-title>Select Period</ui-card-title>
          </ui-card-header>
          <ui-card-content>
            <div class="grid grid-cols-3 gap-4 items-end">
              <div class="space-y-2">
                <ui-label>Year</ui-label>
                <select class="flex h-9 w-full rounded-md border border-input bg-input-background px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-1 focus:ring-ring" [value]="selectedYear()" (change)="selectedYear.set(($any($event.target)).value)">
                  <option value="2024">2024</option>
                  <option value="2025">2025</option>
                  <option value="2026">2026</option>
                </select>
              </div>
              <div class="space-y-2">
                <ui-label>Month</ui-label>
                <select class="flex h-9 w-full rounded-md border border-input bg-input-background px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-1 focus:ring-ring" [value]="selectedMonth()" (change)="selectedMonth.set(($any($event.target)).value)">
                  @for (m of months; track m.value) {
                    <option [value]="m.value">{{ m.label }}</option>
                  }
                </select>
              </div>
              <ui-button size="lg" (click)="generate()">Generate Reports</ui-button>
            </div>
          </ui-card-content>
        </ui-card>

        @if (showData()) {
          <div class="grid gap-4 md:grid-cols-3">
            <ui-card>
              <ui-card-header className="flex flex-row items-center justify-between space-y-0 pb-2">
                <ui-card-title className="text-sm font-medium">Total Bonus Payable</ui-card-title>
              </ui-card-header>
              <ui-card-content>
                <div class="text-2xl font-semibold text-green-600">\${{ fmt(totalBonus()) }}</div>
                <p class="text-xs text-muted-foreground mt-1">For {{ getMonthLabel() }} {{ selectedYear() }}</p>
              </ui-card-content>
            </ui-card>
            <ui-card>
              <ui-card-header className="flex flex-row items-center justify-between space-y-0 pb-2">
                <ui-card-title className="text-sm font-medium">Total Conversions</ui-card-title>
              </ui-card-header>
              <ui-card-content>
                <div class="text-2xl font-semibold">{{ totalConversions() }}</div>
                <p class="text-xs text-muted-foreground mt-1">Qualifying sales</p>
              </ui-card-content>
            </ui-card>
            <ui-card>
              <ui-card-header className="flex flex-row items-center justify-between space-y-0 pb-2">
                <ui-card-title className="text-sm font-medium">Total Sales Volume</ui-card-title>
              </ui-card-header>
              <ui-card-content>
                <div class="text-2xl font-semibold">\${{ fmt(totalSales()) }}</div>
                <p class="text-xs text-muted-foreground mt-1">Revenue generated</p>
              </ui-card-content>
            </ui-card>
          </div>

          <ui-card>
            <ui-card-header>
              <div class="flex justify-between items-center">
                <div>
                  <ui-card-title>Sheet 1: Bonus Payment Summary</ui-card-title>
                  <p class="text-sm text-muted-foreground mt-1">Amount payable to each agent</p>
                </div>
                <ui-button variant="outline" (click)="exportCSV('summary')">Export CSV</ui-button>
              </div>
            </ui-card-header>
            <ui-card-content>
              <ui-table>
                <ui-table-header>
                  <ui-table-row>
                    <ui-table-head>Agent</ui-table-head>
                    <ui-table-head className="text-right">Conversions</ui-table-head>
                    <ui-table-head className="text-right">Total Sales</ui-table-head>
                    <ui-table-head className="text-right">Avg Sale</ui-table-head>
                    <ui-table-head className="text-right">Total Bonus</ui-table-head>
                  </ui-table-row>
                </ui-table-header>
                <ui-table-body>
                  @for (agent of bonusSummary; track agent.agentCode) {
                    <ui-table-row>
                      <ui-table-cell>
                        <div class="flex items-center gap-3">
                          <ui-avatar [fallback]="initials(agent.agentName)" />
                          <div>
                            <p class="font-medium">{{ agent.agentName }}</p>
                            <p class="text-sm text-muted-foreground">{{ agent.agentCode }}</p>
                          </div>
                        </div>
                      </ui-table-cell>
                      <ui-table-cell className="text-right font-medium">{{ agent.conversions }}</ui-table-cell>
                      <ui-table-cell className="text-right font-medium">\${{ fmt(agent.totalSales) }}</ui-table-cell>
                      <ui-table-cell className="text-right text-muted-foreground">\${{ fmt(Math.round(agent.totalSales / agent.conversions)) }}</ui-table-cell>
                      <ui-table-cell className="text-right font-semibold text-green-600">\${{ fmt(agent.totalBonus) }}</ui-table-cell>
                    </ui-table-row>
                  }
                  <ui-table-row className="bg-gray-50 font-semibold">
                    <ui-table-cell>TOTAL</ui-table-cell>
                    <ui-table-cell className="text-right">{{ totalConversions() }}</ui-table-cell>
                    <ui-table-cell className="text-right">\${{ fmt(totalSales()) }}</ui-table-cell>
                    <ui-table-cell className="text-right">\${{ fmt(Math.round(totalSales() / totalConversions())) }}</ui-table-cell>
                    <ui-table-cell className="text-right text-green-600">\${{ fmt(totalBonus()) }}</ui-table-cell>
                  </ui-table-row>
                </ui-table-body>
              </ui-table>
            </ui-card-content>
          </ui-card>

          <ui-card>
            <ui-card-header>
              <div class="flex justify-between items-center">
                <div>
                  <ui-card-title>Sheet 2: Detailed Audit Trail</ui-card-title>
                  <p class="text-sm text-muted-foreground mt-1">Line-by-line breakdown showing how each bonus was calculated</p>
                </div>
                <ui-button variant="outline" (click)="exportCSV('details')">Export CSV</ui-button>
              </div>
            </ui-card-header>
            <ui-card-content>
              <div class="overflow-x-auto">
                <ui-table>
                  <ui-table-header>
                    <ui-table-row>
                      <ui-table-head>Agent</ui-table-head>
                      <ui-table-head>Lead ID</ui-table-head>
                      <ui-table-head>Customer</ui-table-head>
                      <ui-table-head>Sale Date</ui-table-head>
                      <ui-table-head className="text-right">Sale Amount</ui-table-head>
                      <ui-table-head>Rule Applied</ui-table-head>
                      <ui-table-head>Calculation</ui-table-head>
                      <ui-table-head className="text-right">Bonus</ui-table-head>
                    </ui-table-row>
                  </ui-table-header>
                  <ui-table-body>
                    @for (d of bonusDetails; track d.id) {
                      <ui-table-row>
                        <ui-table-cell>
                          <p class="font-medium text-sm">{{ d.agentName }}</p>
                          <p class="text-xs text-muted-foreground">{{ d.agentCode }}</p>
                        </ui-table-cell>
                        <ui-table-cell className="font-mono text-sm">{{ d.leadId }}</ui-table-cell>
                        <ui-table-cell>{{ d.customerName }}</ui-table-cell>
                        <ui-table-cell className="text-sm text-muted-foreground">{{ d.saleDate }}</ui-table-cell>
                        <ui-table-cell className="text-right font-medium">\${{ fmt(d.saleAmount) }}</ui-table-cell>
                        <ui-table-cell>
                          <p class="font-medium text-sm">{{ d.ruleName }}</p>
                          <p class="text-xs text-muted-foreground">{{ d.ruleType }}</p>
                        </ui-table-cell>
                        <ui-table-cell>
                          <ui-badge variant="outline" className="font-mono text-xs">{{ d.calculation }}</ui-badge>
                        </ui-table-cell>
                        <ui-table-cell className="text-right font-semibold text-green-600">\${{ fmt(d.bonusAmount) }}</ui-table-cell>
                      </ui-table-row>
                    }
                  </ui-table-body>
                </ui-table>
              </div>
            </ui-card-content>
          </ui-card>
        }
      </div>
    </app-page-layout>
  `,
})
export class AccountantDashboardComponent {
  private toastService = inject(ToastService);
  Math = Math;
  selectedYear = signal('2026');
  selectedMonth = signal('01');
  showData = signal(false);
  months = [
    { value: '01', label: 'January' }, { value: '02', label: 'February' }, { value: '03', label: 'March' },
    { value: '04', label: 'April' }, { value: '05', label: 'May' }, { value: '06', label: 'June' },
    { value: '07', label: 'July' }, { value: '08', label: 'August' }, { value: '09', label: 'September' },
    { value: '10', label: 'October' }, { value: '11', label: 'November' }, { value: '12', label: 'December' },
  ];
  bonusSummary = [
    { agentName: 'John Smith', agentCode: 'AG-001', totalBonus: 2730, conversions: 18, totalSales: 27300 },
    { agentName: 'Sarah Johnson', agentCode: 'AG-003', totalBonus: 2275, conversions: 15, totalSales: 22750 },
    { agentName: 'Michael Brown', agentCode: 'AG-005', totalBonus: 2480, conversions: 16, totalSales: 24800 },
    { agentName: 'Emily Davis', agentCode: 'AG-007', totalBonus: 2120, conversions: 14, totalSales: 21200 },
    { agentName: 'Maria Garcia', agentCode: 'SUP-042', totalBonus: 14850, conversions: 98, totalSales: 148500 },
  ];
  bonusDetails = [
    { id: '1', agentName: 'John Smith', agentCode: 'AG-001', leadId: 'LD-10023', customerName: 'Robert Davis', saleAmount: 5500, saleDate: 'Jan 18, 2026', ruleName: 'High Value Sale Bonus', ruleType: '15% of sale (cap $1000)', bonusAmount: 825, calculation: '$5,500 x 15% = $825' },
    { id: '2', agentName: 'John Smith', agentCode: 'AG-001', leadId: 'LD-10020', customerName: 'Patricia Martinez', saleAmount: 850, saleDate: 'Jan 17, 2026', ruleName: 'Quick Conversion Bonus', ruleType: 'Fixed amount', bonusAmount: 100, calculation: 'Lead to sale in 1 day = $100' },
    { id: '3', agentName: 'Sarah Johnson', agentCode: 'AG-003', leadId: 'LD-10019', customerName: 'Michael Wilson', saleAmount: 6200, saleDate: 'Jan 16, 2026', ruleName: 'High Value Sale Bonus', ruleType: '15% of sale (cap $1000)', bonusAmount: 930, calculation: '$6,200 x 15% = $930' },
    { id: '4', agentName: 'Michael Brown', agentCode: 'AG-005', leadId: 'LD-10017', customerName: 'James Anderson', saleAmount: 4800, saleDate: 'Jan 15, 2026', ruleName: 'Premium Product Bonus', ruleType: '12% of sale (cap $800)', bonusAmount: 576, calculation: '$4,800 x 12% = $576' },
  ];
  totalBonus = computed(() => this.bonusSummary.reduce((s, a) => s + a.totalBonus, 0));
  totalConversions = computed(() => this.bonusSummary.reduce((s, a) => s + a.conversions, 0));
  totalSales = computed(() => this.bonusSummary.reduce((s, a) => s + a.totalSales, 0));
  generate() { this.showData.set(true); this.toastService.show('Reports Generated', 'Bonus reports generated successfully'); }
  exportCSV(type: string) { this.toastService.show('Exported', `${type === 'summary' ? 'Summary' : 'Audit details'} exported to CSV`); }
  getMonthLabel(): string { return this.months.find(m => m.value === this.selectedMonth())?.label || ''; }
  initials(name: string): string { return name.split(' ').map(n => n[0]).join(''); }
  fmt(value: number): string { return value.toLocaleString(); }
}
