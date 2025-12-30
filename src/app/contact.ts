import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './contact.html',
  styles: [`
    .contact-container { max-width:900px; margin:40px auto; padding:20px; }
    .contact-grid { display:grid; grid-template-columns:1fr 1fr; gap:16px; }
    .contact-card { background:#fff; padding:16px; border-radius:8px; box-shadow:0 4px 12px rgba(0,0,0,0.06); }
    .whatsapp-link { display:inline-block; margin-top:8px; background:#25D366; color:#fff; padding:8px 12px; border-radius:8px; text-decoration:none; }
    .footer { text-align:center; margin-top:24px; color:#666; font-size:13px; }
  `]
})
export class ContactComponent {}
