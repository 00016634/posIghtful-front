import { Component, signal } from '@angular/core';
import { Router } from '@angular/router';
import { CardComponent, CardHeaderComponent, CardTitleComponent, CardDescriptionComponent, CardContentComponent, CardFooterComponent } from '../../shared/ui/card.component';
import { ButtonComponent } from '../../shared/ui/button.component';
import { BadgeComponent } from '../../shared/ui/badge.component';

interface Plan {
  name: string;
  price: number;
  description: string;
  features: string[];
  popular: boolean;
}

@Component({
  selector: 'app-platform-purchase',
  standalone: true,
  imports: [
    CardComponent,
    CardHeaderComponent,
    CardTitleComponent,
    CardDescriptionComponent,
    CardContentComponent,
    CardFooterComponent,
    ButtonComponent,
    BadgeComponent,
  ],
  template: `
    <div class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col items-center justify-center p-4 md:p-8">
      <div class="text-center mb-10">
        <h1 class="text-4xl font-bold text-gray-900 mb-2">Choose Your Plan</h1>
        <p class="text-lg text-gray-600 max-w-2xl mx-auto">
          Select the perfect plan for your business. All plans include a 14-day free trial.
        </p>
      </div>

      <div class="grid md:grid-cols-3 gap-8 max-w-5xl w-full">
        @for (plan of plans(); track plan.name) {
          <ui-card [className]="plan.popular
            ? 'relative border-2 border-primary shadow-xl scale-105'
            : 'relative hover:shadow-lg transition-shadow'">
            @if (plan.popular) {
              <div class="absolute -top-3 left-1/2 -translate-x-1/2">
                <ui-badge>Most Popular</ui-badge>
              </div>
            }
            <ui-card-header className="text-center pt-8">
              <ui-card-title className="text-xl">{{ plan.name }}</ui-card-title>
              <ui-card-description>{{ plan.description }}</ui-card-description>
              <div class="mt-4">
                <span class="text-4xl font-bold text-gray-900">\${{ plan.price }}</span>
                <span class="text-muted-foreground">/month</span>
              </div>
            </ui-card-header>
            <ui-card-content>
              <ul class="space-y-3">
                @for (feature of plan.features; track feature) {
                  <li class="flex items-center gap-3 text-sm">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-green-600 shrink-0">
                      <path d="M20 6 9 17l-5-5"/>
                    </svg>
                    <span class="text-gray-700">{{ feature }}</span>
                  </li>
                }
              </ul>
            </ui-card-content>
            <ui-card-footer className="justify-center pb-8">
              <ui-button
                [variant]="plan.popular ? 'default' : 'outline'"
                className="w-full"
                size="lg"
                (click)="selectPlan(plan)">
                Get Started
              </ui-button>
            </ui-card-footer>
          </ui-card>
        }
      </div>

      <p class="text-sm text-muted-foreground mt-8">
        All plans include SSL security, 99.9% uptime guarantee, and 24/7 support.
      </p>
    </div>
  `,
})
export class PlatformPurchaseComponent {
  plans = signal<Plan[]>([
    {
      name: 'Starter',
      price: 299,
      description: 'Perfect for small teams getting started',
      features: [
        'Up to 5 agents',
        'Basic analytics dashboard',
        'Lead management',
        'Email support',
        '1 GB storage',
      ],
      popular: false,
    },
    {
      name: 'Professional',
      price: 799,
      description: 'Best for growing sales organizations',
      features: [
        'Up to 25 agents',
        'Advanced analytics & reports',
        'Lead & conversion tracking',
        'Bonus management',
        'Priority support',
        '10 GB storage',
        'Custom branding',
      ],
      popular: true,
    },
    {
      name: 'Enterprise',
      price: 1999,
      description: 'For large organizations with complex needs',
      features: [
        'Unlimited agents',
        'Full analytics suite',
        'Advanced bonus rules engine',
        'Product funnel management',
        'Dedicated account manager',
        'Unlimited storage',
        'API access',
        'SSO & SAML',
      ],
      popular: false,
    },
  ]);

  constructor(private router: Router) {}

  selectPlan(plan: Plan) {
    this.router.navigateByUrl('/purchase/payment');
  }
}
