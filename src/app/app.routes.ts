import { Routes } from '@angular/router';
import { authGuard, guestGuard } from './guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./features/onboarding/onboarding.routes').then(m => m.onboardingRoutes),
  },
  {
    path: 'login',
    loadComponent: () => import('./components/auth/login/login').then(m => m.Login),
    canActivate: [guestGuard],
  },
  {
    path: 'register',
    loadComponent: () => import('./components/auth/register/register').then(m => m.Register),
    canActivate: [guestGuard],
  },
  {
    path: 'agent',
    loadChildren: () => import('./features/agent/agent.routes').then(m => m.agentRoutes),
    canActivate: [authGuard],
  },
  {
    path: 'supervisor',
    loadChildren: () => import('./features/supervisor/supervisor.routes').then(m => m.supervisorRoutes),
    canActivate: [authGuard],
  },
  {
    path: 'manager',
    loadChildren: () => import('./features/manager/manager.routes').then(m => m.managerRoutes),
    canActivate: [authGuard],
  },
  {
    path: 'accountant',
    loadChildren: () => import('./features/accountant/accountant.routes').then(m => m.accountantRoutes),
    canActivate: [authGuard],
  },
  {
    path: 'admin',
    loadChildren: () => import('./features/admin/admin.routes').then(m => m.adminRoutes),
    canActivate: [authGuard],
  },
  {
    path: 'dashboard',
    loadComponent: () => import('./components/dashboard/dashboard').then(m => m.Dashboard),
    canActivate: [authGuard],
  },
  {
    path: '**',
    redirectTo: '',
  },
];
