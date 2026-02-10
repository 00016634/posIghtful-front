import { Component, inject, signal, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PageLayoutComponent } from '../../shared/layouts';
import { AnalyticsCardComponent, ConversionChartComponent } from '../../shared/components';
import {
  CardComponent,
  CardHeaderComponent,
  CardTitleComponent,
  CardContentComponent,
  ButtonComponent,
  TableComponent,
  TableHeaderComponent,
  TableBodyComponent,
  TableRowComponent,
  TableHeadComponent,
  TableCellComponent,
} from '../../shared/ui';
import { AnalyticsService } from '../../services/analytics.service';

@Component({
  selector: 'app-manager-dashboard',
  standalone: true,
  imports: [
    PageLayoutComponent,
    AnalyticsCardComponent,
    ConversionChartComponent,
    CardComponent,
    CardHeaderComponent,
    CardTitleComponent,
    CardContentComponent,
    ButtonComponent,
    TableComponent,
    TableHeaderComponent,
    TableBodyComponent,
    TableRowComponent,
    TableHeadComponent,
    TableCellComponent,
  ],
  template: `
    <app-page-layout>
      <!-- Header -->
      <div class="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <div>
          <h1 class="text-3xl font-bold tracking-tight">Manager Dashboard</h1>
          <p class="text-muted-foreground mt-1">Overview of your organization's performance</p>
        </div>
        <div class="flex gap-2 mt-4 md:mt-0">
          <ui-button variant="outline" (click)="navigateTo('/manager/all-agents')">All Agents</ui-button>
          <ui-button variant="outline" (click)="navigateTo('/manager/product-funnel')">Product Funnel</ui-button>
          <ui-button (click)="navigateTo('/manager/bonus-management')">Bonus Management</ui-button>
        </div>
      </div>

      <!-- Metric Cards -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        @if (metrics()) {
          <app-analytics-card
            title="Total Agents"
            [value]="'' + metrics()!.totalAgents.value"
            [trend]="metrics()!.totalAgents.subtitle"
          />
          <app-analytics-card
            title="Total Revenue"
            [value]="metrics()!.totalRevenue.value"
            [trend]="metrics()!.totalRevenue.trend"
            [trendUp]="true"
          />
          <app-analytics-card
            title="Conversion Rate"
            [value]="metrics()!.conversionRate.value"
            [trend]="metrics()!.conversionRate.trend"
            [trendUp]="true"
          />
          <app-analytics-card
            title="Bonus Expenses"
            [value]="metrics()!.bonusExpenses.value"
            [trend]="metrics()!.bonusExpenses.trend"
          />
        }
      </div>

      <!-- Charts Row 1 -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        @if (revenueTrend()) {
          <ui-card>
            <ui-card-header>
              <ui-card-title>Revenue Trend</ui-card-title>
            </ui-card-header>
            <ui-card-content>
              <app-conversion-chart
                [labels]="revenueTrend()!.labels"
                [datasets]="revenueTrend()!.datasets"
                chartType="area"
                height="280px"
              />
            </ui-card-content>
          </ui-card>
        }
        @if (personnelChart()) {
          <ui-card>
            <ui-card-header>
              <ui-card-title>Personnel</ui-card-title>
            </ui-card-header>
            <ui-card-content>
              <app-conversion-chart
                [labels]="personnelChart()!.labels"
                [datasets]="personnelChart()!.datasets"
                chartType="bar"
                height="280px"
              />
            </ui-card-content>
          </ui-card>
        }
      </div>

      <!-- Charts Row 2 -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        @if (conversionRateTrend()) {
          <ui-card>
            <ui-card-header>
              <ui-card-title>Avg Revenue / Agent</ui-card-title>
            </ui-card-header>
            <ui-card-content>
              <app-conversion-chart
                [labels]="avgRevenueLabels()"
                [datasets]="avgRevenueDatasets()"
                chartType="bar"
                height="260px"
              />
            </ui-card-content>
          </ui-card>
        }
        @if (conversionRateTrend()) {
          <ui-card>
            <ui-card-header>
              <ui-card-title>Conversion Rate Trend</ui-card-title>
            </ui-card-header>
            <ui-card-content>
              <app-conversion-chart
                [labels]="conversionRateTrend()!.labels"
                [datasets]="conversionRateTrend()!.datasets"
                chartType="line"
                height="260px"
              />
            </ui-card-content>
          </ui-card>
        }
        @if (performanceChart()) {
          <ui-card>
            <ui-card-header>
              <ui-card-title>Performance</ui-card-title>
            </ui-card-header>
            <ui-card-content>
              <app-conversion-chart
                [labels]="performanceChart()!.labels"
                [datasets]="performanceChart()!.datasets"
                chartType="bar"
                height="260px"
              />
            </ui-card-content>
          </ui-card>
        }
      </div>

      <!-- Supervisor Performance Table -->
      <ui-card>
        <ui-card-header>
          <ui-card-title>Team Performance by Supervisor</ui-card-title>
        </ui-card-header>
        <ui-card-content>
          <ui-table>
            <ui-table-header>
              <ui-table-row>
                <ui-table-head>Supervisor</ui-table-head>
                <ui-table-head>Code</ui-table-head>
                <ui-table-head className="text-center">Agents</ui-table-head>
                <ui-table-head className="text-center">Leads</ui-table-head>
                <ui-table-head className="text-center">Conversions</ui-table-head>
                <ui-table-head className="text-right">Revenue</ui-table-head>
              </ui-table-row>
            </ui-table-header>
            <ui-table-body>
              @for (sup of supervisorPerformance(); track sup.code) {
                <ui-table-row>
                  <ui-table-cell className="font-medium">{{ sup.name }}</ui-table-cell>
                  <ui-table-cell>{{ sup.code }}</ui-table-cell>
                  <ui-table-cell className="text-center">{{ sup.agents }}</ui-table-cell>
                  <ui-table-cell className="text-center">{{ sup.leads }}</ui-table-cell>
                  <ui-table-cell className="text-center">{{ sup.conversions }}</ui-table-cell>
                  <ui-table-cell className="text-right font-medium">{{ formatCurrency(sup.revenue) }}</ui-table-cell>
                </ui-table-row>
              }
            </ui-table-body>
          </ui-table>
        </ui-card-content>
      </ui-card>
    </app-page-layout>
  `,
})
export class ManagerDashboardComponent implements OnInit {
  private analyticsService = inject(AnalyticsService);
  private router = inject(Router);

  metrics = signal<any>(null);
  revenueTrend = signal<any>(null);
  personnelChart = signal<any>(null);
  conversionRateTrend = signal<any>(null);
  performanceChart = signal<any>(null);
  supervisorPerformance = signal<any[]>([]);

  avgRevenueLabels = signal<string[]>([]);
  avgRevenueDatasets = signal<any[]>([]);

  ngOnInit() {
    this.analyticsService.getManagerMetrics().subscribe(data => this.metrics.set(data));
    this.analyticsService.getRevenueTrend().subscribe(data => this.revenueTrend.set(data));
    this.analyticsService.getPersonnelChart().subscribe(data => {
      this.personnelChart.set(data);
      // Compute avg revenue per agent from revenue trend and personnel
      if (data && this.revenueTrend()) {
        const rev = this.revenueTrend()!;
        const agents = data.datasets[0].data;
        const avgData = rev.datasets[0].data.map((r: number, i: number) =>
          Math.round(r / (agents[i] || 1))
        );
        this.avgRevenueLabels.set(rev.labels);
        this.avgRevenueDatasets.set([
          { name: 'Avg Revenue/Agent', data: avgData, color: '#f59e0b' },
        ]);
      }
    });
    this.analyticsService.getConversionRateTrend().subscribe(data => this.conversionRateTrend.set(data));
    this.analyticsService.getPerformanceChart().subscribe(data => this.performanceChart.set(data));
    this.analyticsService.getSupervisorPerformance().subscribe(data => this.supervisorPerformance.set(data));
  }

  navigateTo(route: string) {
    this.router.navigateByUrl(route);
  }

  formatCurrency(value: number): string {
    return '$' + value.toLocaleString();
  }
}
