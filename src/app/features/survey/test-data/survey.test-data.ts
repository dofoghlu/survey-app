import { Survey } from "../models/survey";
import { mockMultipleChoiceQuestion, mockSingleChoiceQuestion } from "./question.test-data";

export const mockSurvey: Survey = {
    id: 'survey1',
    title: 'Customer Satisfaction Survey',
    description: 'A survey to gauge customer satisfaction levels.',
    questions: [mockSingleChoiceQuestion, mockMultipleChoiceQuestion],
};