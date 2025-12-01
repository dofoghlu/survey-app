import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-welcome',
  standalone: true,
  imports: [FormsModule],
  template: `
    <div class="h-full flex flex-col p-6 gap-4 max-w-sm mx-auto pt-48">
      <div>
        <h1 class="text-3xl font-semibold text-center">Welcome</h1>
        <p class="text-center">Please enter your email to get started.</p>
      </div>

      <input
        class="border border-[#D0D5DD] rounded-lg p-2"
        placeholder="Enter your email"
        [(ngModel)]="email"
      />

      <button class="text-button" [disabled]="!email" (click)="save()">Continue</button>
    </div>
  `,
})
export class Welcome {
  email = '';

  constructor(private router: Router) {}

  save = () => {
    localStorage.setItem('apiKey', this.email);
    this.router.navigateByUrl('/');
  };
}
