import { Component, inject, signal, OnInit } from '@angular/core';
import { QRCodeComponent } from 'angularx-qrcode';
import { PageLayoutComponent, PageHeaderComponent } from '../../shared/layouts';
import {
  CardComponent, CardHeaderComponent, CardTitleComponent, CardContentComponent,
  AvatarComponent,
} from '../../shared/ui';
import { AgentService } from '../../services/agent.service';

@Component({
  selector: 'app-supervisor-person-info',
  standalone: true,
  imports: [
    PageLayoutComponent,
    PageHeaderComponent,
    CardComponent,
    CardHeaderComponent,
    CardTitleComponent,
    CardContentComponent,
    AvatarComponent,
    QRCodeComponent,
  ],
  template: `
    <app-page-layout>
      <app-page-header title="Supervisor Profile" subtitle="Your personal information" backRoute="/supervisor">
      </app-page-header>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <!-- Profile Card -->
        <ui-card className="lg:col-span-2">
          <ui-card-header>
            <ui-card-title>Personal Information</ui-card-title>
          </ui-card-header>
          <ui-card-content>
            <div class="flex flex-col sm:flex-row items-start gap-6">
              <div class="flex flex-col items-center gap-3">
                <ui-avatar
                  size="lg"
                  [fallback]="getInitials(profile().fullName)"
                  className="h-24 w-24 text-2xl"
                />
                <p class="text-sm font-medium text-muted-foreground">{{ profile().supervisorCode }}</p>
              </div>
              <div class="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <p class="text-sm text-muted-foreground">Full Name</p>
                  <p class="text-sm font-medium">{{ profile().fullName }}</p>
                </div>
                <div>
                  <p class="text-sm text-muted-foreground">Supervisor Code</p>
                  <p class="text-sm font-medium">{{ profile().supervisorCode }}</p>
                </div>
                <div>
                  <p class="text-sm text-muted-foreground">Phone</p>
                  <p class="text-sm font-medium">{{ profile().phone }}</p>
                </div>
                <div>
                  <p class="text-sm text-muted-foreground">Region</p>
                  <p class="text-sm font-medium">{{ profile().region }}</p>
                </div>
                <div>
                  <p class="text-sm text-muted-foreground">Manager</p>
                  <p class="text-sm font-medium">{{ profile().manager }}</p>
                </div>
                <div>
                  <p class="text-sm text-muted-foreground">Hire Date</p>
                  <p class="text-sm font-medium">{{ profile().hireDate }}</p>
                </div>
              </div>
            </div>
          </ui-card-content>
        </ui-card>

        <!-- QR Code Card -->
        <ui-card>
          <ui-card-header>
            <ui-card-title>QR Code</ui-card-title>
          </ui-card-header>
          <ui-card-content>
            <div class="flex flex-col items-center gap-4">
              <qrcode
                [qrdata]="qrData()"
                [width]="200"
                errorCorrectionLevel="M"
              />
              <p class="text-xs text-muted-foreground text-center">
                Scan to view supervisor profile
              </p>
            </div>
          </ui-card-content>
        </ui-card>
      </div>

      <!-- Team Agents -->
      <ui-card className="mt-6">
        <ui-card-header>
          <ui-card-title>Team Agents</ui-card-title>
        </ui-card-header>
        <ui-card-content>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            @for (agent of teamAgents(); track agent.id) {
              <div class="flex items-center gap-4 p-4 rounded-lg border">
                <ui-avatar
                  [fallback]="getInitials(agent.fullName)"
                />
                <div class="flex-1 min-w-0">
                  <p class="text-sm font-medium truncate">{{ agent.fullName }}</p>
                  <p class="text-xs text-muted-foreground">{{ agent.agentCode }}</p>
                  <p class="text-xs text-muted-foreground">{{ agent.region }}</p>
                </div>
                <div class="text-right">
                  <p class="text-sm font-semibold">{{ agent.conversions }}/{{ agent.leads }}</p>
                  <p class="text-xs text-muted-foreground">converted</p>
                </div>
              </div>
            }
          </div>
        </ui-card-content>
      </ui-card>
    </app-page-layout>
  `,
})
export class SupervisorPersonInfoComponent implements OnInit {
  private agentService = inject(AgentService);

  profile = signal({
    fullName: '',
    supervisorCode: '',
    phone: '',
    region: '',
    manager: '',
    hireDate: '',
  });

  teamAgents = signal<any[]>([]);

  qrData = signal('');

  ngOnInit() {
    this.agentService.getSupervisorProfile().subscribe(data => {
      this.profile.set(data);
      this.qrData.set(JSON.stringify({
        name: data.fullName,
        code: data.supervisorCode,
        phone: data.phone,
        region: data.region,
      }));
    });

    this.agentService.getAgents().subscribe(agents => {
      this.teamAgents.set(agents.slice(0, 3));
    });
  }

  getInitials(name: string): string {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  }
}
