import { Component, inject, signal, computed, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PageLayoutComponent } from '../../shared/layouts/page-layout.component';
import {
  CardComponent, CardHeaderComponent, CardTitleComponent, CardContentComponent,
  ButtonComponent, AvatarComponent,
  TableComponent, TableHeaderComponent, TableBodyComponent,
  TableRowComponent, TableHeadComponent, TableCellComponent,
} from '../../shared/ui';
import { BonusService } from '../../services/bonus.service';

@Component({
  selector: 'app-monthly-bonus-detail',
  standalone: true,
  imports: [
    PageLayoutComponent,
    CardComponent, CardHeaderComponent, CardTitleComponent, CardContentComponent,
    ButtonComponent, AvatarComponent,
    TableComponent, TableHeaderComponent, TableBodyComponent,
    TableRowComponent, TableHeadComponent, TableCellComponent,
  ],
  template: `
    <app-page-layout>
      <div class="mx-auto max-w-7xl space-y-6">
        <!-- Header -->
        <div class="flex items-center gap-4">
          <ui-button variant="ghost" size="icon" (click)="router.navigateByUrl('/manager/bonus-management')">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m12 19-7-7 7-7"/><path d="M19 12H5"/></svg>
          </ui-button>
          <div>
            <h1 class="text-2xl font-semibold">Bonus Details - {{ month }}</h1>
            <p class="text-sm text-muted-foreground">Agent-by-agent bonus breakdown</p>
          </div>
        </div>

        <!-- Summary -->
        <ui-card>
          <ui-card-header>
            <ui-card-title>Month Summary</ui-card-title>
          </ui-card-header>
          <ui-card-content>
            <div class="grid grid-cols-4 gap-6">
              <div>
                <p class="text-sm text-muted-foreground">Total Agents</p>
                <p class="text-2xl font-semibold">{{ agents().length }}</p>
              </div>
              <div>
                <p class="text-sm text-muted-foreground">Total Conversions</p>
                <p class="text-2xl font-semibold">{{ totalConversions() }}</p>
              </div>
              <div>
                <p class="text-sm text-muted-foreground">Total Sales</p>
                <p class="text-2xl font-semibold">\${{ formatNumber(totalSales()) }}</p>
              </div>
              <div>
                <p class="text-sm text-muted-foreground">Total Bonuses</p>
                <p class="text-2xl font-semibold text-green-600">\${{ formatNumber(totalBonuses()) }}</p>
              </div>
            </div>
          </ui-card-content>
        </ui-card>

        <!-- Agent Bonuses Table -->
        <ui-card>
          <ui-card-header>
            <ui-card-title>Agent Bonus Breakdown</ui-card-title>
          </ui-card-header>
          <ui-card-content>
            <ui-table>
              <ui-table-header>
                <ui-table-row>
                  <ui-table-head>Agent</ui-table-head>
                  <ui-table-head className="text-right">Conversions</ui-table-head>
                  <ui-table-head className="text-right">Total Sales</ui-table-head>
                  <ui-table-head className="text-right">Avg Sale</ui-table-head>
                  <ui-table-head className="text-right">Bonus Amount</ui-table-head>
                </ui-table-row>
              </ui-table-header>
              <ui-table-body>
                @for (agent of agents(); track agent.agentCode) {
                  <ui-table-row>
                    <ui-table-cell>
                      <div class="flex items-center gap-3">
                        <ui-avatar [fallback]="getInitials(agent.agentName)" />
                        <div>
                          <p class="font-medium">{{ agent.agentName }}</p>
                          <p class="text-sm text-muted-foreground">{{ agent.agentCode }}</p>
                        </div>
                      </div>
                    </ui-table-cell>
                    <ui-table-cell className="text-right font-medium">{{ agent.conversions }}</ui-table-cell>
                    <ui-table-cell className="text-right font-medium">\${{ formatNumber(agent.totalSales) }}</ui-table-cell>
                    <ui-table-cell className="text-right text-muted-foreground">\${{ formatNumber(Math.round(agent.totalSales / agent.conversions)) }}</ui-table-cell>
                    <ui-table-cell className="text-right font-semibold text-green-600">\${{ formatNumber(agent.bonusAmount) }}</ui-table-cell>
                  </ui-table-row>
                }
              </ui-table-body>
            </ui-table>
          </ui-card-content>
        </ui-card>
      </div>
    </app-page-layout>
  `,
})
export class MonthlyBonusDetailComponent implements OnInit {
  private route = inject(ActivatedRoute);
  router = inject(Router);
  private bonusService = inject(BonusService);

  month = '';
  agents = signal<any[]>([]);
  Math = Math;

  totalConversions = computed(() => this.agents().reduce((sum, a) => sum + a.conversions, 0));
  totalSales = computed(() => this.agents().reduce((sum, a) => sum + a.totalSales, 0));
  totalBonuses = computed(() => this.agents().reduce((sum, a) => sum + a.bonusAmount, 0));

  ngOnInit() {
    this.month = this.route.snapshot.paramMap.get('month') || '';
    this.bonusService.getMonthlyDetail(this.month).subscribe(data => this.agents.set(data));
  }

  getInitials(name: string): string {
    return name.split(' ').map(n => n[0]).join('');
  }

  formatNumber(value: number): string {
    return value.toLocaleString();
  }
}
