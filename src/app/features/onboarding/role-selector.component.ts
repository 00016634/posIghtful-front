import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CardComponent, CardHeaderComponent, CardTitleComponent, CardDescriptionComponent, CardContentComponent } from '../../shared/ui/card.component';
import { ButtonComponent } from '../../shared/ui/button.component';
import { RoleService } from '../../services/role.service';
import { Role } from '../../models/user.model';

/** Maps backend color names → Tailwind class sets (must be full static strings for Tailwind scanner) */
const COLOR_MAP: Record<string, { hex: string; cardClass: string; iconBgClass: string; dotClass: string; btnClass: string }> = {
  blue:   { hex: '#2563eb', cardClass: 'hover:shadow-xl transition-shadow cursor-pointer border-2 hover:border-blue-500',   iconBgClass: 'h-20 w-20 rounded-full bg-blue-100 flex items-center justify-center',   dotClass: 'h-1.5 w-1.5 rounded-full bg-blue-600',   btnClass: '' },
  purple: { hex: '#9333ea', cardClass: 'hover:shadow-xl transition-shadow cursor-pointer border-2 hover:border-purple-500', iconBgClass: 'h-20 w-20 rounded-full bg-purple-100 flex items-center justify-center', dotClass: 'h-1.5 w-1.5 rounded-full bg-purple-600', btnClass: 'bg-purple-600 hover:bg-purple-700' },
  green:  { hex: '#16a34a', cardClass: 'hover:shadow-xl transition-shadow cursor-pointer border-2 hover:border-green-500',  iconBgClass: 'h-20 w-20 rounded-full bg-green-100 flex items-center justify-center',  dotClass: 'h-1.5 w-1.5 rounded-full bg-green-600',  btnClass: 'bg-green-600 hover:bg-green-700' },
  orange: { hex: '#ea580c', cardClass: 'hover:shadow-xl transition-shadow cursor-pointer border-2 hover:border-orange-500', iconBgClass: 'h-20 w-20 rounded-full bg-orange-100 flex items-center justify-center', dotClass: 'h-1.5 w-1.5 rounded-full bg-orange-600', btnClass: 'bg-orange-600 hover:bg-orange-700' },
  red:    { hex: '#dc2626', cardClass: 'hover:shadow-xl transition-shadow cursor-pointer border-2 hover:border-red-500',    iconBgClass: 'h-20 w-20 rounded-full bg-red-100 flex items-center justify-center',    dotClass: 'h-1.5 w-1.5 rounded-full bg-red-600',    btnClass: 'bg-red-600 hover:bg-red-700' },
};

/** Maps backend icon names → SVG paths */
const ICON_MAP: Record<string, { d1: string; d2: string }> = {
  user:     { d1: 'M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2', d2: 'M12 3a4 4 0 1 0 0 8 4 4 0 0 0 0-8z' },
  users:    { d1: 'M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2', d2: 'M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75' },
  building: { d1: 'M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z', d2: 'M9 22V12h6v10' },
  receipt:  { d1: 'M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1Z', d2: 'M8 7h8M8 11h8M8 15h4' },
  shield:   { d1: 'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z', d2: '' },
};

interface RoleCard {
  code: string;
  name: string;
  description: string;
  path: string;
  features: string[];
  hex: string;
  cardClass: string;
  iconBgClass: string;
  dotClass: string;
  btnClass: string;
  iconPath: string;
  iconPath2: string;
}

@Component({
  selector: 'app-role-selector',
  standalone: true,
  imports: [CardComponent, CardHeaderComponent, CardTitleComponent, CardDescriptionComponent, CardContentComponent, ButtonComponent],
  template: `
    <div class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div class="w-full max-w-7xl">
        <div class="text-center mb-8">
          <h1 class="text-4xl font-bold text-gray-900 mb-2">POSightful</h1>
          <p class="text-lg text-gray-600">Select your role to continue</p>
          <button class="mt-2 text-primary underline-offset-4 hover:underline text-sm" (click)="navigate('/purchase')">
            Don't have an account? Get Started &rarr;
          </button>
        </div>

        @if (loading) {
          <div class="flex justify-center py-20">
            <div class="h-10 w-10 animate-spin rounded-full border-4 border-blue-200 border-t-blue-600"></div>
          </div>
        } @else if (error) {
          <div class="text-center py-20">
            <p class="text-red-600 mb-4">{{ error }}</p>
            <ui-button (click)="loadRoles()">Retry</ui-button>
          </div>
        } @else {
          <div class="grid md:grid-cols-2 lg:grid-cols-5 gap-6">
            @for (role of roleCards; track role.code) {
              <ui-card [className]="role.cardClass">
                <ui-card-header className="text-center">
                  <div class="flex justify-center mb-4">
                    <div [class]="role.iconBgClass">
                      <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" [attr.stroke]="role.hex" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                        <path [attr.d]="role.iconPath" />
                        @if (role.iconPath2) { <path [attr.d]="role.iconPath2" /> }
                      </svg>
                    </div>
                  </div>
                  <ui-card-title className="text-2xl">{{ role.name }}</ui-card-title>
                  <ui-card-description>{{ role.description }}</ui-card-description>
                </ui-card-header>
                <ui-card-content>
                  <ul class="space-y-2 text-sm text-gray-600 mb-6">
                    @for (feature of role.features; track feature) {
                      <li class="flex items-center gap-2">
                        <span [class]="role.dotClass"></span>
                        {{ feature }}
                      </li>
                    }
                  </ul>
                  <ui-button [className]="'w-full ' + role.btnClass" size="lg" (click)="navigate(role.path)">
                    Continue as {{ role.name }}
                  </ui-button>
                </ui-card-content>
              </ui-card>
            }
          </div>
        }
      </div>
    </div>
  `,
})
export class RoleSelectorComponent implements OnInit {
  roleCards: RoleCard[] = [];
  loading = true;
  error = '';

  constructor(
    private router: Router,
    private roleService: RoleService,
  ) {}

  ngOnInit(): void {
    this.loadRoles();
  }

  loadRoles(): void {
    this.loading = true;
    this.error = '';
    this.roleService.getRoles().subscribe({
      next: (roles) => {
        this.roleCards = roles.map((r) => this.toCard(r));
        this.loading = false;
      },
      error: () => {
        this.error = 'Failed to load roles. Is the backend running?';
        this.loading = false;
      },
    });
  }

  navigate(path: string): void {
    this.router.navigateByUrl(path);
  }

  private toCard(role: Role): RoleCard {
    const colors = COLOR_MAP[role.color] ?? COLOR_MAP['blue'];
    const icon = ICON_MAP[role.icon] ?? ICON_MAP['user'];

    // Build features list from permissions: "leads" → "Leads: view, create, update"
    const features = Object.entries(role.permissions).map(
      ([resource, actions]) =>
        `${this.capitalize(resource.replace('_', ' '))}: ${(actions as string[]).join(', ')}`
    );

    return {
      code: role.code,
      name: role.name,
      description: role.description ?? '',
      path: `/${role.code.toLowerCase()}`,
      features,
      hex: colors.hex,
      cardClass: colors.cardClass,
      iconBgClass: colors.iconBgClass,
      dotClass: colors.dotClass,
      btnClass: colors.btnClass,
      iconPath: icon.d1,
      iconPath2: icon.d2,
    };
  }

  private capitalize(s: string): string {
    return s.charAt(0).toUpperCase() + s.slice(1);
  }
}
