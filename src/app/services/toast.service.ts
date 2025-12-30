import { Injectable, signal } from '@angular/core';

export interface ToastMessage {
  text: string;
  type?: 'info' | 'success' | 'error';
}

@Injectable({ providedIn: 'root' })
export class ToastService {
  private _message = signal<ToastMessage | null>(null);
  message = this._message;

  show(text: string, type: ToastMessage['type'] = 'info', ms = 3500) {
    this._message.set({ text, type });
    setTimeout(() => this._message.set(null), ms);
  }

  clear() {
    this._message.set(null);
  }
}
