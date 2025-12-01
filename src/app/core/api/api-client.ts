import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { environment } from "../../../environments/environment";

@Injectable({ providedIn: 'root' })
export class ApiClient {
  private http = inject(HttpClient);
  private base = environment.apiUrl;

  get = <T>(path: string) =>
    this.http.get<T>(this.base + path);

  post = <T>(path: string, body: unknown) =>
    this.http.post<T>(this.base + path, body);

  put = <T>(path: string, body: unknown) =>
    this.http.put<T>(this.base + path, body);

  delete = <T>(path: string) =>
    this.http.delete<T>(this.base + path);
}
