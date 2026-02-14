import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CardComponent, CardHeaderComponent, CardTitleComponent, CardDescriptionComponent, CardContentComponent } from '../../shared/ui/card.component';
import { ButtonComponent } from '../../shared/ui/button.component';

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
            Don't have an account? Get Started →
          </button>
        </div>
        <div class="grid md:grid-cols-2 lg:grid-cols-5 gap-6">
          @for (role of roles; track role.path) {
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
      </div>
    </div>
  `,
})
export class RoleSelectorComponent {
  roles = [
    {
      name: 'Agent', path: '/agent', hex: '#2563eb',
      cardClass: 'hover:shadow-xl transition-shadow cursor-pointer border-2 hover:border-blue-500',
      iconBgClass: 'h-20 w-20 rounded-full bg-blue-100 flex items-center justify-center',
      dotClass: 'h-1.5 w-1.5 rounded-full bg-blue-600',
      btnClass: '',
      description: 'Manage leads, track conversions, and view bonuses',
      features: ['Create leads', 'Track conversions', 'View bonuses'],
      iconPath: 'M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2',
      iconPath2: 'M12 3a4 4 0 1 0 0 8 4 4 0 0 0 0-8z',
    },
    {
      name: 'Supervisor', path: '/supervisor', hex: '#9333ea',
      cardClass: 'hover:shadow-xl transition-shadow cursor-pointer border-2 hover:border-purple-500',
      iconBgClass: 'h-20 w-20 rounded-full bg-purple-100 flex items-center justify-center',
      dotClass: 'h-1.5 w-1.5 rounded-full bg-purple-600',
      btnClass: 'bg-purple-600 hover:bg-purple-700',
      description: 'Monitor team performance and oversee leads',
      features: ['Team analytics', 'Manage leads', 'Manage agents'],
      iconPath: 'M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2',
      iconPath2: 'M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75',
    },
    {
      name: 'Manager', path: '/manager', hex: '#16a34a',
      cardClass: 'hover:shadow-xl transition-shadow cursor-pointer border-2 hover:border-green-500',
      iconBgClass: 'h-20 w-20 rounded-full bg-green-100 flex items-center justify-center',
      dotClass: 'h-1.5 w-1.5 rounded-full bg-green-600',
      btnClass: 'bg-green-600 hover:bg-green-700',
      description: 'Organization analytics and policy configuration',
      features: ['Org analytics', 'Bonus rules', 'Product funnels'],
      iconPath: 'M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z',
      iconPath2: 'M9 22V12h6v10',
    },
    {
      name: 'Accountant', path: '/accountant', hex: '#ea580c',
      cardClass: 'hover:shadow-xl transition-shadow cursor-pointer border-2 hover:border-orange-500',
      iconBgClass: 'h-20 w-20 rounded-full bg-orange-100 flex items-center justify-center',
      dotClass: 'h-1.5 w-1.5 rounded-full bg-orange-600',
      btnClass: 'bg-orange-600 hover:bg-orange-700',
      description: 'Generate bonus reports and audit trails',
      features: ['Bonus reports', 'Audit trails', 'Export CSV'],
      iconPath: 'M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1Z',
      iconPath2: 'M8 7h8M8 11h8M8 15h4',
    },
    {
      name: 'Admin', path: '/admin', hex: '#dc2626',
      cardClass: 'hover:shadow-xl transition-shadow cursor-pointer border-2 hover:border-red-500',
      iconBgClass: 'h-20 w-20 rounded-full bg-red-100 flex items-center justify-center',
      dotClass: 'h-1.5 w-1.5 rounded-full bg-red-600',
      btnClass: 'bg-red-600 hover:bg-red-700',
      description: 'Manage users, products, and system settings',
      features: ['User management', 'Product catalog', 'System config'],
      iconPath: 'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z',
      iconPath2: '',
    },
  ];
  constructor(private router: Router) {}
  navigate(path: string) { this.router.navigateByUrl(path); }
}
