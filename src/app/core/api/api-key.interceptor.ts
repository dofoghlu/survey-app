import type { HttpInterceptorFn } from '@angular/common/http';

export const apiKeyInterceptor: HttpInterceptorFn = (req, next) => {
  const key = localStorage.getItem('apiKey') ?? '';

  return next(
    req.clone({
      setHeaders: { 'X-API-KEY': key }
    })
  );
};
