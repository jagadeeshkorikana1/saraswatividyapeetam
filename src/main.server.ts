// src/main.server.ts
import 'zone.js/node';

import { bootstrapApplication, BootstrapContext } from '@angular/platform-browser';
import { provideServerRendering } from '@angular/platform-server';
import { provideRouter } from '@angular/router';

// Your app root + routes
import { App } from './app/app';
import { routes } from './app/app.routes';

// If you have other top-level providers (HttpClient, animations, etc.),
// add them inside the providers array below.

export default function bootstrap(context: BootstrapContext) {
  return bootstrapApplication(
    App,
    {
      providers: [
        provideRouter(routes),
        provideServerRendering(), // server-only providers for SSR
        // Example: provideHttpClient(), provideAnimations(), etc.
      ],
    },
    context // <-- REQUIRED: pass the server BootstrapContext here
  );
}
