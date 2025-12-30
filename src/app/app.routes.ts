import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: 'home',  loadComponent: () => import('./home').then(m => m.Home) },
  { path: 'quiz',  loadComponent: () => import('./quiz').then(m => m.QuizComponent) },
  { path: 'about', loadComponent: () => import('./about').then(m => m.AboutComponent) },
  { path: 'contact', loadComponent: () => import('./contact').then(m => m.ContactComponent) },
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: '**', redirectTo: 'home' },
];
