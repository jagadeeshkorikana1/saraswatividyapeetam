import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { QuizComponent } from './quiz';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, QuizComponent],
  templateUrl: './home.html',
  styleUrls: ['./home.scss'],
})
export class Home {}
