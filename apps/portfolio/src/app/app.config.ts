import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideClientHydration } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';

import { withNgxsReduxDevtoolsPlugin } from '@ngxs/devtools-plugin';
import { provideStore } from '@ngxs/store';

import { APP_ROUTES } from './app.routes';

export const APP_CONFIG: ApplicationConfig = {
  providers: [
    provideStore([], withNgxsReduxDevtoolsPlugin()),
    provideClientHydration(),
    provideZoneChangeDetection({
      eventCoalescing: true,
    }),
    provideRouter(APP_ROUTES),
  ],
};
