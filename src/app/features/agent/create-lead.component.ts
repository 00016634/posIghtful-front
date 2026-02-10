import { Component, signal, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { PageLayoutComponent } from '../../shared/layouts/page-layout.component';
import { PageHeaderComponent } from '../../shared/layouts/page-header.component';
import { CardComponent, CardHeaderComponent, CardTitleComponent, CardDescriptionComponent, CardContentComponent, CardFooterComponent } from '../../shared/ui/card.component';
import { LabelComponent } from '../../shared/ui/label.component';
import { InputComponent } from '../../shared/ui/input.component';
import { TextareaComponent } from '../../shared/ui/textarea.component';
import { ButtonComponent } from '../../shared/ui/button.component';
import { ToastService } from '../../shared/ui/toast.service';
import { LeadService } from '../../services/lead.service';

@Component({
  selector: 'app-create-lead',
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
    TextareaComponent,
    ButtonComponent,
  ],
  template: `
    <app-page-layout>
      <app-page-header
        title="Create Lead"
        subtitle="Record a new customer interaction"
        backRoute="/agent">
      </app-page-header>

      <div class="max-w-2xl mx-auto">
        <ui-card>
          <ui-card-header>
            <ui-card-title>New Lead</ui-card-title>
            <ui-card-description>Fill in the details about this customer interaction</ui-card-description>
          </ui-card-header>
          <ui-card-content>
            <form [formGroup]="leadForm" (ngSubmit)="onSubmit()" class="space-y-6">
              <!-- Interaction Type -->
              <div class="space-y-3">
                <ui-label>Interaction Type</ui-label>
                <div class="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  @for (type of interactionTypes; track type.value) {
                    <label
                      [class]="'flex flex-col items-center gap-2 p-4 rounded-lg border-2 cursor-pointer transition-all ' +
                        (leadForm.get('interactionType')?.value === type.value
                          ? 'border-primary bg-primary/5'
                          : 'border-input hover:border-primary/50')">
                      <input
                        type="radio"
                        formControlName="interactionType"
                        [value]="type.value"
                        class="sr-only" />
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                        [class]="leadForm.get('interactionType')?.value === type.value ? 'text-primary' : 'text-muted-foreground'">
                        <path [attr.d]="type.iconPath" />
                        @if (type.iconPath2) {
                          <path [attr.d]="type.iconPath2" />
                        }
                      </svg>
                      <span class="text-sm font-medium">{{ type.label }}</span>
                    </label>
                  }
                </div>
                @if (leadForm.get('interactionType')?.invalid && leadForm.get('interactionType')?.touched) {
                  <p class="text-sm text-red-600">Please select an interaction type</p>
                }
              </div>

              <!-- Customer Name -->
              <div class="space-y-2">
                <ui-label htmlFor="customerName">Customer Name</ui-label>
                <ui-input
                  formControlName="customerName"
                  placeholder="Enter customer's full name">
                </ui-input>
                @if (leadForm.get('customerName')?.invalid && leadForm.get('customerName')?.touched) {
                  <p class="text-sm text-red-600">Customer name is required</p>
                }
              </div>

              <!-- Customer Phone -->
              <div class="space-y-2">
                <ui-label htmlFor="customerPhone">Customer Phone</ui-label>
                <ui-input
                  formControlName="customerPhone"
                  type="tel"
                  placeholder="+998 (90) 123-4567">
                </ui-input>
                @if (leadForm.get('customerPhone')?.invalid && leadForm.get('customerPhone')?.touched) {
                  <p class="text-sm text-red-600">A valid phone number is required</p>
                }
              </div>

              <!-- Notes -->
              <div class="space-y-2">
                <ui-label htmlFor="notes">Notes</ui-label>
                <ui-textarea
                  formControlName="notes"
                  placeholder="Add any relevant notes about this interaction..."
                  [rows]="4">
                </ui-textarea>
              </div>

              <div class="flex justify-end gap-3">
                <ui-button variant="outline" type="button" (click)="cancel()">
                  Cancel
                </ui-button>
                <ui-button
                  type="submit"
                  [disabled]="leadForm.invalid || submitting()">
                  @if (submitting()) {
                    <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Saving...
                  } @else {
                    Create Lead
                  }
                </ui-button>
              </div>
            </form>
          </ui-card-content>
        </ui-card>
      </div>
    </app-page-layout>
  `,
})
export class CreateLeadComponent {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private toastService = inject(ToastService);
  private leadService = inject(LeadService);

  submitting = signal(false);

  interactionTypes = [
    { value: 'Phone', label: 'Phone', iconPath: 'M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z', iconPath2: '' },
    { value: 'Email', label: 'Email', iconPath: 'M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z', iconPath2: 'M22 6l-10 7L2 6' },
    { value: 'In Person', label: 'In Person', iconPath: 'M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2', iconPath2: 'M12 3a4 4 0 1 0 0 8 4 4 0 0 0 0-8z' },
    { value: 'Online Chat', label: 'Online Chat', iconPath: 'M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z', iconPath2: '' },
  ];

  leadForm = this.fb.group({
    interactionType: ['', [Validators.required]],
    customerName: ['', [Validators.required]],
    customerPhone: ['', [Validators.required, Validators.minLength(7)]],
    notes: [''],
  });

  onSubmit() {
    if (this.leadForm.invalid) {
      this.leadForm.markAllAsTouched();
      return;
    }

    this.submitting.set(true);

    this.leadService.createLead(this.leadForm.value).subscribe({
      next: () => {
        this.submitting.set(false);
        this.toastService.show('Lead Created', 'The lead has been successfully created.');
        this.router.navigateByUrl('/agent');
      },
      error: () => {
        this.submitting.set(false);
        this.toastService.show('Error', 'Failed to create lead. Please try again.', 'destructive');
      },
    });
  }

  cancel() {
    this.router.navigateByUrl('/agent');
  }
}
