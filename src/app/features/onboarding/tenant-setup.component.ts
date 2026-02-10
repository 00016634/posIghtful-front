import { Component, signal, computed, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { PageLayoutComponent } from '../../shared/layouts/page-layout.component';
import { PageHeaderComponent } from '../../shared/layouts/page-header.component';
import { CardComponent, CardHeaderComponent, CardTitleComponent, CardDescriptionComponent, CardContentComponent, CardFooterComponent } from '../../shared/ui/card.component';
import { LabelComponent } from '../../shared/ui/label.component';
import { InputComponent } from '../../shared/ui/input.component';
import { SelectComponent } from '../../shared/ui/select.component';
import { ButtonComponent } from '../../shared/ui/button.component';
import { ProgressComponent } from '../../shared/ui/progress.component';

@Component({
  selector: 'app-tenant-setup',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    PageLayoutComponent,
    PageHeaderComponent,
    CardComponent,
    CardHeaderComponent,
    CardTitleComponent,
    CardDescriptionComponent,
    CardContentComponent,
    CardFooterComponent,
    LabelComponent,
    InputComponent,
    SelectComponent,
    ButtonComponent,
    ProgressComponent,
  ],
  template: `
    <app-page-layout>
      <app-page-header
        title="Setup Your Organization"
        subtitle="Complete the setup to start using POSightful">
      </app-page-header>

      <div class="max-w-2xl mx-auto">
        <!-- Progress indicator -->
        <div class="mb-8">
          <div class="flex justify-between text-sm mb-2">
            <span [class]="currentStep() >= 1 ? 'text-primary font-medium' : 'text-muted-foreground'">
              Step 1: Company Info
            </span>
            <span [class]="currentStep() >= 2 ? 'text-primary font-medium' : 'text-muted-foreground'">
              Step 2: Admin Account
            </span>
          </div>
          <ui-progress [value]="progressValue()"></ui-progress>
        </div>

        <!-- Step 1: Company Information -->
        @if (currentStep() === 1) {
          <ui-card>
            <ui-card-header>
              <ui-card-title>Company Information</ui-card-title>
              <ui-card-description>Tell us about your organization</ui-card-description>
            </ui-card-header>
            <ui-card-content>
              <form [formGroup]="companyForm" class="space-y-6">
                <div class="space-y-2">
                  <ui-label htmlFor="companyName">Company Name</ui-label>
                  <ui-input
                    formControlName="companyName"
                    placeholder="Acme Corporation">
                  </ui-input>
                  @if (companyForm.get('companyName')?.invalid && companyForm.get('companyName')?.touched) {
                    <p class="text-sm text-red-600">Company name is required</p>
                  }
                </div>

                <div class="space-y-2">
                  <ui-label htmlFor="companySize">Company Size</ui-label>
                  <ui-select formControlName="companySize">
                    <option value="" disabled>Select company size</option>
                    @for (size of companySizes; track size) {
                      <option [value]="size">{{ size }} employees</option>
                    }
                  </ui-select>
                  @if (companyForm.get('companySize')?.invalid && companyForm.get('companySize')?.touched) {
                    <p class="text-sm text-red-600">Please select a company size</p>
                  }
                </div>

                <div class="space-y-2">
                  <ui-label htmlFor="industry">Industry</ui-label>
                  <ui-select formControlName="industry">
                    <option value="" disabled>Select industry</option>
                    @for (ind of industries; track ind) {
                      <option [value]="ind">{{ ind }}</option>
                    }
                  </ui-select>
                  @if (companyForm.get('industry')?.invalid && companyForm.get('industry')?.touched) {
                    <p class="text-sm text-red-600">Please select an industry</p>
                  }
                </div>
              </form>
            </ui-card-content>
            <ui-card-footer className="justify-end">
              <ui-button
                size="lg"
                [disabled]="companyForm.invalid"
                (click)="nextStep()">
                Next Step
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="ml-2">
                  <path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>
                </svg>
              </ui-button>
            </ui-card-footer>
          </ui-card>
        }

        <!-- Step 2: Admin Account -->
        @if (currentStep() === 2) {
          <ui-card>
            <ui-card-header>
              <ui-card-title>Admin Account</ui-card-title>
              <ui-card-description>Create the administrator account for your organization</ui-card-description>
            </ui-card-header>
            <ui-card-content>
              <form [formGroup]="adminForm" class="space-y-6">
                <div class="space-y-2">
                  <ui-label htmlFor="adminName">Full Name</ui-label>
                  <ui-input
                    formControlName="adminName"
                    placeholder="John Doe">
                  </ui-input>
                  @if (adminForm.get('adminName')?.invalid && adminForm.get('adminName')?.touched) {
                    <p class="text-sm text-red-600">Admin name is required</p>
                  }
                </div>

                <div class="space-y-2">
                  <ui-label htmlFor="adminEmail">Email Address</ui-label>
                  <ui-input
                    formControlName="adminEmail"
                    type="email"
                    placeholder="admin@company.com">
                  </ui-input>
                  @if (adminForm.get('adminEmail')?.invalid && adminForm.get('adminEmail')?.touched) {
                    <p class="text-sm text-red-600">A valid email address is required</p>
                  }
                </div>

                <div class="space-y-2">
                  <ui-label htmlFor="adminPassword">Password</ui-label>
                  <ui-input
                    formControlName="adminPassword"
                    type="password"
                    placeholder="Minimum 8 characters">
                  </ui-input>
                  @if (adminForm.get('adminPassword')?.invalid && adminForm.get('adminPassword')?.touched) {
                    <p class="text-sm text-red-600">Password must be at least 8 characters</p>
                  }
                </div>
              </form>
            </ui-card-content>
            <ui-card-footer className="justify-between">
              <ui-button variant="outline" (click)="previousStep()">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-2">
                  <path d="m12 19-7-7 7-7"/><path d="M19 12H5"/>
                </svg>
                Back
              </ui-button>
              <ui-button
                size="lg"
                [disabled]="adminForm.invalid"
                (click)="finish()">
                Complete Setup
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="ml-2">
                  <path d="M20 6 9 17l-5-5"/>
                </svg>
              </ui-button>
            </ui-card-footer>
          </ui-card>
        }
      </div>
    </app-page-layout>
  `,
})
export class TenantSetupComponent {
  private fb = inject(FormBuilder);
  private router = inject(Router);

  currentStep = signal(1);
  progressValue = computed(() => this.currentStep() === 1 ? 50 : 100);

  companySizes = ['1-10', '11-50', '51-200', '201-500', '500+'];
  industries = ['Insurance', 'Real Estate', 'Financial Services', 'Retail', 'Other'];

  companyForm = this.fb.group({
    companyName: ['', [Validators.required]],
    companySize: ['', [Validators.required]],
    industry: ['', [Validators.required]],
  });

  adminForm = this.fb.group({
    adminName: ['', [Validators.required]],
    adminEmail: ['', [Validators.required, Validators.email]],
    adminPassword: ['', [Validators.required, Validators.minLength(8)]],
  });

  nextStep() {
    if (this.companyForm.valid) {
      this.currentStep.set(2);
    } else {
      this.companyForm.markAllAsTouched();
    }
  }

  previousStep() {
    this.currentStep.set(1);
  }

  finish() {
    if (this.adminForm.valid) {
      this.router.navigateByUrl('/admin');
    } else {
      this.adminForm.markAllAsTouched();
    }
  }
}
