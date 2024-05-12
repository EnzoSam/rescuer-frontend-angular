import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { UiService } from './shared/services/ui.service';
import { authInterceptor } from './core/interceptors/auth-interceptor.interceptor';

export const appConfig: ApplicationConfig = {
  
  providers: [
    provideRouter(routes), 
    provideAnimations(),
    provideHttpClient(withInterceptors([authInterceptor])),
    UiService
  ]
};
