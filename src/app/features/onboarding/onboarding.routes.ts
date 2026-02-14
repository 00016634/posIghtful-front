import { Routes } from '@angular/router';

export const onboardingRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./role-selector.component').then(m => m.RoleSelectorComponent),
  },
];

export const purchaseRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./platform-purchase.component').then(m => m.PlatformPurchaseComponent),
  },
  {
    path: 'payment',
    loadComponent: () => import('./payment.component').then(m => m.PaymentComponent),
  },
  {
    path: 'setup',
    loadComponent: () => import('./tenant-setup.component').then(m => m.TenantSetupComponent),
  },
];
