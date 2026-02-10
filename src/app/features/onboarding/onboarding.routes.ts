import { Routes } from '@angular/router';

export const onboardingRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./role-selector.component').then(m => m.RoleSelectorComponent),
  },
  {
    path: 'purchase',
    loadComponent: () => import('./platform-purchase.component').then(m => m.PlatformPurchaseComponent),
  },
  {
    path: 'purchase/payment',
    loadComponent: () => import('./payment.component').then(m => m.PaymentComponent),
  },
  {
    path: 'purchase/setup',
    loadComponent: () => import('./tenant-setup.component').then(m => m.TenantSetupComponent),
  },
];
