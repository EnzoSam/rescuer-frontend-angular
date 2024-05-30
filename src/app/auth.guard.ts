import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { UiService } from './shared/services/ui.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(UiService);
  const router = inject(Router);
  
  if (!authService.isAuthenticated()) {
    router.navigate(['/auth']);
    return false;
  }  

  if (route.data) {
    let { expectedRole } = route.data;
    if (expectedRole) {
      let auth = authService.getAuthentication();
      if(!auth.roles.includes(expectedRole))
        {
          authService.setNewErrorStatus('No autorizado', {});
          return false;
        }
    }
  }
  return true;
};
