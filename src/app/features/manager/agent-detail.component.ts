import { Component, inject, signal, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PageLayoutComponent } from '../../shared/layouts/page-layout.component';
import { ConversionChartComponent } from '../../shared/components/conversion-chart.component';
import {
  CardComponent, CardHeaderComponent, CardTitleComponent, CardContentComponent,
  ButtonComponent, AvatarComponent, BadgeComponent,
  TableComponent, TableHeaderComponent, TableBodyComponent,
  TableRowComponent, TableHeadComponent, TableCellComponent,
} from '../../shared/ui';
import { AgentService } from '../../services/agent.service';

@Component({
  selector: 'app-agent-detail',
  standalone: true,
  imports: [
    PageLayoutComponent, ConversionChartComponent,
    CardComponent, CardHeaderComponent, CardTitleComponent, CardContentComponent,
    ButtonComponent, AvatarComponent, BadgeComponent,
    TableComponent, TableHeaderComponent, TableBodyComponent,
    TableRowComponent, TableHeadComponent, TableCellComponent,
  ],
  template: `
    <app-page-layout>
      <div class="mx-auto max-w-7xl space-y-6">
        <!-- Header -->
        <div class="flex items-center gap-4">
          <ui-button variant="ghost" size="icon" (click)="router.navigateByUrl('/manager/all-agents')">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m12 19-7-7 7-7"/><path d="M19 12H5"/></svg>
          </ui-button>
          <div>
            <h1 class="text-2xl font-semibold">{{ isSupervisor ? 'Supervisor' : 'Agent' }} Details</h1>
            <p class="text-sm text-muted-foreground">Detailed performance and information</p>
          </div>
        </div>

        <!-- Profile Card -->
        <ui-card>
          <ui-card-content className="pt-6">
            <div class="flex flex-col md:flex-row gap-6">
              <ui-avatar [fallback]="getInitials(agent().fullName)" size="lg" className="h-24 w-24 text-2xl" />
              <div class="flex-1">
                <div class="flex items-start justify-between mb-4">
                  <div>
                    <h2 class="text-2xl font-semibold">{{ agent().fullName }}</h2>
                    <div class="flex items-center gap-2 mt-1">
                      <ui-badge variant="secondary">{{ agent().agentCode }}</ui-badge>
                      <ui-badge>{{ agent().role }}</ui-badge>
                    </div>
                  </div>
                </div>
                <div class="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div class="flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="text-muted-foreground"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                    <span>{{ agent().phone }}</span>
                  </div>
                  <div class="flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="text-muted-foreground"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
                    <span>{{ agent().region }}</span>
                  </div>
                  <div class="flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="text-muted-foreground"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/></svg>
                    <span>Hired: {{ agent().hireDate }}</span>
                  </div>
                  @if (agent().supervisor) {
                    <div class="flex items-center gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="text-muted-foreground"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
                      <span>{{ agent().supervisor }}</span>
                    </div>
                  }
                </div>
              </div>
            </div>
          </ui-card-content>
        </ui-card>

        <!-- Stats Grid -->
        <div class="grid gap-4 md:grid-cols-4">
          <ui-card>
            <ui-card-header className="flex flex-row items-center justify-between space-y-0 pb-2">
              <ui-card-title className="text-sm font-medium">Total Leads</ui-card-title>
            </ui-card-header>
            <ui-card-content>
              <div class="text-2xl font-semibold">{{ stats().totalLeads }}</div>
              <p class="text-xs text-muted-foreground mt-1">{{ stats().pendingLeads }} pending</p>
            </ui-card-content>
          </ui-card>

          <ui-card>
            <ui-card-header className="flex flex-row items-center justify-between space-y-0 pb-2">
              <ui-card-title className="text-sm font-medium">Conversions</ui-card-title>
            </ui-card-header>
            <ui-card-content>
              <div class="text-2xl font-semibold text-green-600">{{ stats().conversions }}</div>
              <p class="text-xs text-muted-foreground mt-1">{{ stats().conversionRate }}% rate</p>
            </ui-card-content>
          </ui-card>

          <ui-card>
            <ui-card-header className="flex flex-row items-center justify-between space-y-0 pb-2">
              <ui-card-title className="text-sm font-medium">Total Revenue</ui-card-title>
            </ui-card-header>
            <ui-card-content>
              <div class="text-2xl font-semibold">\${{ formatNumber(stats().totalRevenue) }}</div>
              <p class="text-xs text-muted-foreground mt-1">Avg: \${{ stats().avgTicket }}</p>
            </ui-card-content>
          </ui-card>

          <ui-card>
            <ui-card-header className="flex flex-row items-center justify-between space-y-0 pb-2">
              <ui-card-title className="text-sm font-medium">Bonus Earned</ui-card-title>
            </ui-card-header>
            <ui-card-content>
              <div class="text-2xl font-semibold text-orange-600">\${{ formatNumber(stats().bonusEarned) }}</div>
              <p class="text-xs text-muted-foreground mt-1">This month</p>
            </ui-card-content>
          </ui-card>
        </div>

        <!-- Performance Chart -->
        <ui-card>
          <ui-card-header>
            <ui-card-title>Performance Trend</ui-card-title>
          </ui-card-header>
          <ui-card-content>
            <app-conversion-chart
              [labels]="perfLabels"
              [datasets]="perfDatasets"
              chartType="line"
              height="300px"
            />
          </ui-card-content>
        </ui-card>

        <!-- Recent Leads (for agents) or Attached Agents (for supervisors) -->
        @if (isSupervisor) {
          <ui-card>
            <ui-card-header>
              <ui-card-title>Attached Agents</ui-card-title>
            </ui-card-header>
            <ui-card-content>
              <ui-table>
                <ui-table-header>
                  <ui-table-row>
                    <ui-table-head>Agent</ui-table-head>
                    <ui-table-head className="text-right">Leads</ui-table-head>
                    <ui-table-head className="text-right">Conversions</ui-table-head>
                    <ui-table-head className="text-right">Conv. Rate</ui-table-head>
                    <ui-table-head className="text-right">Revenue</ui-table-head>
                  </ui-table-row>
                </ui-table-header>
                <ui-table-body>
                  @for (a of attachedAgents; track a.agentCode) {
                    <ui-table-row>
                      <ui-table-cell>
                        <div class="flex items-center gap-3">
                          <ui-avatar [fallback]="getInitials(a.fullName)" />
                          <div>
                            <p class="font-medium">{{ a.fullName }}</p>
                            <p class="text-sm text-muted-foreground">{{ a.agentCode }}</p>
                          </div>
                        </div>
                      </ui-table-cell>
                      <ui-table-cell className="text-right font-medium">{{ a.leads }}</ui-table-cell>
                      <ui-table-cell className="text-right font-medium text-green-600">{{ a.conversions }}</ui-table-cell>
                      <ui-table-cell className="text-right">{{ a.conversionRate }}%</ui-table-cell>
                      <ui-table-cell className="text-right font-medium">\${{ formatNumber(a.revenue) }}</ui-table-cell>
                    </ui-table-row>
                  }
                </ui-table-body>
              </ui-table>
            </ui-card-content>
          </ui-card>
        } @else {
          <ui-card>
            <ui-card-header>
              <ui-card-title>Recent Leads</ui-card-title>
            </ui-card-header>
            <ui-card-content>
              <ui-table>
                <ui-table-header>
                  <ui-table-row>
                    <ui-table-head>Lead ID</ui-table-head>
                    <ui-table-head>Customer</ui-table-head>
                    <ui-table-head>Status</ui-table-head>
                    <ui-table-head>Amount</ui-table-head>
                    <ui-table-head>Date</ui-table-head>
                  </ui-table-row>
                </ui-table-header>
                <ui-table-body>
                  @for (lead of recentLeads; track lead.id) {
                    <ui-table-row>
                      <ui-table-cell className="font-medium">{{ lead.id }}</ui-table-cell>
                      <ui-table-cell>{{ lead.customer }}</ui-table-cell>
                      <ui-table-cell>
                        <span [class]="'inline-flex items-center rounded-md px-2.5 py-0.5 text-xs font-semibold ' + getStatusColor(lead.status)">
                          {{ lead.status }}
                        </span>
                      </ui-table-cell>
                      <ui-table-cell>{{ lead.amount ? '$' + formatNumber(lead.amount) : '—' }}</ui-table-cell>
                      <ui-table-cell className="text-sm text-muted-foreground">{{ lead.date }}</ui-table-cell>
                    </ui-table-row>
                  }
                </ui-table-body>
              </ui-table>
            </ui-card-content>
          </ui-card>
        }
      </div>
    </app-page-layout>
  `,
})
export class AgentDetailComponent implements OnInit {
  private route = inject(ActivatedRoute);
  router = inject(Router);
  private agentService = inject(AgentService);

  isSupervisor = false;

  agent = signal({
    fullName: '', agentCode: '', role: '', supervisor: '',
    region: '', phone: '', hireDate: '',
  });

  stats = signal({
    totalLeads: 0, conversions: 0, conversionRate: 0,
    totalRevenue: 0, avgTicket: 0, pendingLeads: 0, bonusEarned: 0,
  });

  perfLabels = ['Week 1', 'Week 2', 'Week 3', 'Week 4'];
  perfDatasets = [
    { name: 'Leads', data: [12, 15, 18, 20], color: '#3b82f6' },
    { name: 'Conversions', data: [4, 6, 7, 8], color: '#10b981' },
  ];

  attachedAgents = [
    { fullName: 'John Smith', agentCode: 'AG-001', leads: 45, conversions: 18, revenue: 27300, conversionRate: 40 },
    { fullName: 'Sarah Johnson', agentCode: 'AG-003', leads: 38, conversions: 15, revenue: 22750, conversionRate: 39.5 },
    { fullName: 'Michael Brown', agentCode: 'AG-005', leads: 42, conversions: 16, revenue: 24800, conversionRate: 38.1 },
    { fullName: 'Emily Davis', agentCode: 'AG-007', leads: 35, conversions: 14, revenue: 21200, conversionRate: 40 },
  ];

  recentLeads = [
    { id: 'LD-10023', customer: 'Robert Davis', status: 'converted', amount: 1200, date: 'Jan 18, 2026' },
    { id: 'LD-10022', customer: 'Emily Wilson', status: 'pending', amount: null, date: 'Jan 18, 2026' },
    { id: 'LD-10021', customer: 'James Anderson', status: 'lost', amount: null, date: 'Jan 17, 2026' },
    { id: 'LD-10020', customer: 'Patricia Martinez', status: 'converted', amount: 850, date: 'Jan 17, 2026' },
  ];

  ngOnInit() {
    const role = this.route.snapshot.paramMap.get('role') || 'agent';
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.isSupervisor = role === 'supervisor';

    this.agentService.getAgentById(id).subscribe(data => {
      if (data) {
        this.agent.set({
          fullName: data.fullName,
          agentCode: data.agentCode,
          role: data.role,
          supervisor: data.supervisor,
          region: data.region,
          phone: data.phone,
          hireDate: data.hireDate,
        });
        this.stats.set({
          totalLeads: data.leads,
          conversions: data.conversions,
          conversionRate: data.leads ? Math.round((data.conversions / data.leads) * 100) : 0,
          totalRevenue: data.revenue,
          avgTicket: data.conversions ? Math.round(data.revenue / data.conversions) : 0,
          pendingLeads: Math.round(data.leads * 0.25),
          bonusEarned: Math.round(data.revenue * 0.1),
        });
      }
    });
  }

  getInitials(name: string): string {
    return name.split(' ').map(n => n[0]).join('');
  }

  getStatusColor(status: string): string {
    switch (status) {
      case 'converted': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'lost': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  }

  formatNumber(value: number): string {
    return value.toLocaleString();
  }
}
