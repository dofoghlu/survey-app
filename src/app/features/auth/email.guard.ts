import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const emailGuard: CanActivateFn = () => {
  const router = inject(Router);
  const email = localStorage.getItem('apiKey');

  return email ? true : router.parseUrl('/welcome');
};