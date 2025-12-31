import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './home.html',
  styleUrls: ['./home.scss']
})
export class Home {
  team = [
    {
      name: 'Chef Azure Master',
      role: 'Head Chef & Azure Architect',
      description: 'With over 10 years of Azure expertise, our head chef crafts the perfect learning recipe for each student.'
    },
    {
      name: 'Tech Sous Chef',
      role: 'Solutions Architect',
      description: 'Specializes in translating complex Azure concepts into digestible learning portions.'
    },
    {
      name: 'Learning Nutritionist',
      role: 'Training Coordinator',
      description: 'Ensures each learning meal is perfectly balanced for maximum knowledge absorption.'
    }
  ];

  features = [
    {
      title: 'Hands-on Learning',
      description: 'Practice real-world scenarios in a live Azure environment.',
      icon: '🛠️'
    },
    {
      title: 'Expert Guidance',
      description: 'Learn from certified Azure professionals with 10+ years of experience.',
      icon: '👨‍🏫'
    },
    {
      title: 'Flexible Schedule',
      description: 'Choose from morning or evening sessions that fit your routine.',
      icon: '⏰'
    },
    {
      title: 'Pay After Learning',
      description: 'Our unique model ensures you only pay after completing the training.',
      icon: '💰'
    }
  ];
}
