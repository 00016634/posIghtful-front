import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isAuthenticated) {
    // Check for role-based access if required
    const requiredRole = route.data['role'];
    if (requiredRole) {
      const hasRole = authService.hasRole(requiredRole);
      if (!hasRole) {
        router.navigate(['/unauthorized']);
        return false;
      }
    }
    return true;
  }

  // Not authenticated, redirect to login
  router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
  return false;
};

export const guestGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (!authService.isAuthenticated) {
    return true;
  }

  // Already authenticated, redirect to dashboard
  router.navigate(['/dashboard']);
  return false;
};
