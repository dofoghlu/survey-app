import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class ApiClient {
  private http = inject(HttpClient);


  private base = environment.apiUrl;
  apiKey = '';

  private buildHeaders() {
    return {
      headers: {
        'X-API-KEY': this.apiKey,
      },
    };
  }

  get<T>(path: string) {
    return this.http.get<T>(this.base + path, this.buildHeaders());
  }

  post<T>(path: string, body: unknown) {
    return this.http.post<T>(this.base + path, body, this.buildHeaders());
  }

  put<T>(path: string, body: unknown) {
    return this.http.put<T>(this.base + path, body, this.buildHeaders());
  }

  delete<T>(path: string) {
    return this.http.delete<T>(this.base + path, this.buildHeaders());
  }
}
