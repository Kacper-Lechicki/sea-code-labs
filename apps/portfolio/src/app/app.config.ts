import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideClientHydration } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';

import { APP_ROUTES } from './app.routes';

export const APP_CONFIG: ApplicationConfig = {
  providers: [
    provideClientHydration(),
    provideZoneChangeDetection({
      eventCoalescing: true,
    }),
    provideRouter(APP_ROUTES),
  ],
};
