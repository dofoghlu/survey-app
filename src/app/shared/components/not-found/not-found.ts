import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div class="h-full flex flex-col p-6 gap-4 max-w-sm mx-auto pt-48">
      <div class="flex flex-col gap-2 text-center">
        <h1 class="text-3xl font-semibold">Page not found</h1>
        <p class="text-gray-600">
          The page you're looking for doesn't exist or may have been moved.
        </p>
      </div>

      <button
        class="text-button mt-2"
        routerLink="/surveys"
      >
        Go to surveys
      </button>
    </div>
  `,
})
export class NotFound {}
