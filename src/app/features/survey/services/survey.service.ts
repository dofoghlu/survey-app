import { inject, Injectable } from '@angular/core';
import { ApiClient } from '../../../core/api/api-client';
import { Survey, SurveyDto } from '../models/survey';

@Injectable({
  providedIn: 'root',
})
export class SurveyService {
  private api = inject(ApiClient);

  static path = '/Survey';
  public path = SurveyService.path;

  getSurveys() {
    return this.api.get<Survey[]>(this.path);
  }

  getSurvey(id: string) {
    return this.api.get<Survey>(`${this.path}/${id}`);
  }

  createSurvey(data: Partial<SurveyDto>) {
    return this.api.post(this.path, data);
  }

  updateSurvey(id: string, data: Partial<SurveyDto>) {
    return this.api.put(`${this.path}/${id}`, data);
  }
}
