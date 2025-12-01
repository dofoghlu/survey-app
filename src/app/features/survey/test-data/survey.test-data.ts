import { Survey } from "../models/survey";
import { mockQuestionList } from "./question.test-data";

export function createSurvey(params: Partial<Survey>): Survey {
  return {
    id: params.id ?? 'survey1',
    title: params.title ?? 'Survey Title',
    description: params.description ?? 'Survey Description',
    questions: params.questions ?? mockQuestionList,
  };
}

export const mockSurvey: Survey = createSurvey({
    id: 'survey1',
    title: 'Survey 1',
    description: 'Survey 1 Description',
    questions: mockQuestionList
});