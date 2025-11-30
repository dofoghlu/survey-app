import { Question } from "./question";

export interface Survey {
  id: string;
  title: string;
  description: string;
  questions: Question[];
}

export interface SurveyDto {
  id: string | null;
  title: string | null;
  description: string | null;
  questions: Question[] | null;
}
