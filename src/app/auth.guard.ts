import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { UiService } from './shared/services/ui.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(UiService);
  const router = inject(Router);

  if (!authService.isAuthenticated()) {
      router.navigate(['/login']);
      return false;
  }

  return true;
};
