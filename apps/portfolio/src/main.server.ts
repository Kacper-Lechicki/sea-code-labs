import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { CONFIG } from './app/app.config.server';
import type { ApplicationRef } from '@angular/core';

const bootstrap: () => Promise<ApplicationRef> = async (): Promise<ApplicationRef> =>
  bootstrapApplication(AppComponent, CONFIG);
export default bootstrap;
