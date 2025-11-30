import { inject, Injectable } from '@angular/core';
import { ApiClient } from '../../../core/api/api-client';

@Injectable({
  providedIn: 'root',
})
export class Survey {
  private api = inject(ApiClient);
  private path = '/Survey';

  getSurveys() {
    return this.api.get<Survey[]>(this.path);
  }

  getSurvey(id: string) {
    return this.api.get<Survey>(`${this.path}/${id}`);
  }

  createSurvey(data: Partial<Survey>) {
    return this.api.post<Survey>(this.path, data);
  }

  updateSurvey(id: string, data: Partial<Survey>) {
    return this.api.put<Survey>(`${this.path}/${id}`, data);
  }
}
