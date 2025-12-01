import { Component, inject, signal } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('survey-app');

  private router = inject(Router);

  showNav = true;

  constructor() {
    this.router.events
      .pipe(filter((e): e is NavigationEnd => e instanceof NavigationEnd))
      .subscribe((e) => {
        this.showNav = !e.urlAfterRedirects.startsWith('/welcome');
      });
  }

  logout = () => {
    localStorage.removeItem('apiEmail');
    this.router.navigateByUrl('/welcome');
  };
}
