import { Component, signal, inject } from '@angular/core';
import { RouterOutlet, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ToastService } from './services/toast.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterModule, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('svp');
  private toast = inject(ToastService);

  constructor() {
    // App starts straight to home (quiz). No authentication logic here.
  }

  // Expose toast signal for template safely
  get toastMessage() {
    return this.toast.message() ?? null;
  }
}
