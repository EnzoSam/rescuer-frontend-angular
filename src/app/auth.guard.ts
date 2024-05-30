import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { UiService } from './shared/services/ui.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(UiService);
  const router = inject(Router);

  console.log('no autenticado ' + authService.isAuthenticated());
  if (!authService.isAuthenticated()) {
      router.navigate(['/auth']);
      return false;
  }

  return true;
};
