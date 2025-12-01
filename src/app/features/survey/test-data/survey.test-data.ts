import { Survey } from "../models/survey";
import { mockQuestionList } from "./question.test-data";

export const mockSurvey: Survey = {
    id: 'survey1',
    title: 'Survey 1',
    description: 'Survey 1 Description',
    questions: mockQuestionList
};