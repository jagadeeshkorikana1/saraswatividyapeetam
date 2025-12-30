import 'zone.js';

import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';

import { importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';

// Firebase client initialization is moved to `src/firebase-client.ts` and must only run in the browser.
// Do NOT import or initialize Firebase here to avoid server-side execution.

// Only bootstrap the client application when running in a browser (not during SSR/prerender).
// Using `window` avoids accessing `import.meta.env` which can be undefined during prerender extraction.
if (typeof window !== 'undefined') {
  bootstrapApplication(App, {
    providers: [provideRouter(routes)],
  });
}