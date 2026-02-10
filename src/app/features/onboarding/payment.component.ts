import { Component, signal, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { PageLayoutComponent } from '../../shared/layouts/page-layout.component';
import { PageHeaderComponent } from '../../shared/layouts/page-header.component';
import { CardComponent, CardHeaderComponent, CardTitleComponent, CardContentComponent, CardFooterComponent } from '../../shared/ui/card.component';
import { LabelComponent } from '../../shared/ui/label.component';
import { InputComponent } from '../../shared/ui/input.component';
import { ButtonComponent } from '../../shared/ui/button.component';
import { SeparatorComponent } from '../../shared/ui/separator.component';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    PageLayoutComponent,
    PageHeaderComponent,
    CardComponent,
    CardHeaderComponent,
    CardTitleComponent,
    CardContentComponent,
    CardFooterComponent,
    LabelComponent,
    InputComponent,
    ButtonComponent,
    SeparatorComponent,
  ],
  template: `
    <app-page-layout>
      <app-page-header
        title="Payment"
        subtitle="Enter your payment details to complete the purchase"
        backRoute="/purchase">
      </app-page-header>

      <div class="grid lg:grid-cols-3 gap-8">
        <!-- Payment Form -->
        <div class="lg:col-span-2">
          <ui-card>
            <ui-card-header>
              <ui-card-title>Payment Details</ui-card-title>
            </ui-card-header>
            <ui-card-content>
              <form [formGroup]="paymentForm" (ngSubmit)="onSubmit()" class="space-y-6">
                <div class="space-y-2">
                  <ui-label htmlFor="cardNumber">Card Number</ui-label>
                  <ui-input
                    formControlName="cardNumber"
                    placeholder="1234 5678 9012 3456">
                  </ui-input>
                  @if (paymentForm.get('cardNumber')?.invalid && paymentForm.get('cardNumber')?.touched) {
                    <p class="text-sm text-red-600">Card number is required</p>
                  }
                </div>

                <div class="space-y-2">
                  <ui-label htmlFor="cardholderName">Cardholder Name</ui-label>
                  <ui-input
                    formControlName="cardholderName"
                    placeholder="John Doe">
                  </ui-input>
                  @if (paymentForm.get('cardholderName')?.invalid && paymentForm.get('cardholderName')?.touched) {
                    <p class="text-sm text-red-600">Cardholder name is required</p>
                  }
                </div>

                <div class="grid grid-cols-2 gap-4">
                  <div class="space-y-2">
                    <ui-label htmlFor="expiry">Expiry Date</ui-label>
                    <ui-input
                      formControlName="expiry"
                      placeholder="MM/YY">
                    </ui-input>
                    @if (paymentForm.get('expiry')?.invalid && paymentForm.get('expiry')?.touched) {
                      <p class="text-sm text-red-600">Valid expiry date required (MM/YY)</p>
                    }
                  </div>
                  <div class="space-y-2">
                    <ui-label htmlFor="cvv">CVV</ui-label>
                    <ui-input
                      formControlName="cvv"
                      placeholder="123"
                      type="password">
                    </ui-input>
                    @if (paymentForm.get('cvv')?.invalid && paymentForm.get('cvv')?.touched) {
                      <p class="text-sm text-red-600">CVV is required (3-4 digits)</p>
                    }
                  </div>
                </div>

                <div class="space-y-2">
                  <ui-label htmlFor="billingEmail">Billing Email</ui-label>
                  <ui-input
                    formControlName="billingEmail"
                    type="email"
                    placeholder="billing@company.com">
                  </ui-input>
                  @if (paymentForm.get('billingEmail')?.invalid && paymentForm.get('billingEmail')?.touched) {
                    <p class="text-sm text-red-600">A valid email address is required</p>
                  }
                </div>

                <ui-button
                  type="submit"
                  className="w-full"
                  size="lg"
                  [disabled]="paymentForm.invalid || processing()">
                  @if (processing()) {
                    <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  } @else {
                    Pay Now
                  }
                </ui-button>
              </form>
            </ui-card-content>
          </ui-card>
        </div>

        <!-- Order Summary Sidebar -->
        <div class="lg:col-span-1">
          <ui-card>
            <ui-card-header>
              <ui-card-title>Order Summary</ui-card-title>
            </ui-card-header>
            <ui-card-content>
              <div class="space-y-4">
                <div class="flex justify-between">
                  <span class="text-muted-foreground">Professional Plan</span>
                  <span class="font-medium">$799.00</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-muted-foreground">Setup Fee</span>
                  <span class="font-medium">$0.00</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-muted-foreground">Tax</span>
                  <span class="font-medium">$95.88</span>
                </div>
                <ui-separator></ui-separator>
                <div class="flex justify-between">
                  <span class="font-semibold">Total</span>
                  <span class="font-bold text-lg">$894.88</span>
                </div>
              </div>

              <div class="mt-6 p-4 bg-blue-50 rounded-lg">
                <p class="text-sm text-blue-800 font-medium">14-Day Free Trial</p>
                <p class="text-xs text-blue-600 mt-1">
                  You won't be charged until the trial period ends. Cancel anytime.
                </p>
              </div>

              <div class="mt-4 flex items-center gap-2 text-xs text-muted-foreground">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                </svg>
                <span>Secured with 256-bit SSL encryption</span>
              </div>
            </ui-card-content>
          </ui-card>
        </div>
      </div>
    </app-page-layout>
  `,
})
export class PaymentComponent {
  private fb = inject(FormBuilder);
  private router = inject(Router);

  processing = signal(false);

  paymentForm = this.fb.group({
    cardNumber: ['', [Validators.required, Validators.minLength(13)]],
    cardholderName: ['', [Validators.required]],
    expiry: ['', [Validators.required, Validators.pattern(/^(0[1-9]|1[0-2])\/\d{2}$/)]],
    cvv: ['', [Validators.required, Validators.pattern(/^\d{3,4}$/)]],
    billingEmail: ['', [Validators.required, Validators.email]],
  });

  onSubmit() {
    if (this.paymentForm.invalid) {
      this.paymentForm.markAllAsTouched();
      return;
    }

    this.processing.set(true);

    setTimeout(() => {
      this.processing.set(false);
      this.router.navigateByUrl('/purchase/setup');
    }, 1500);
  }
}
