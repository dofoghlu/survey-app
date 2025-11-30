import { QuestionType } from "../constants/question-type";
import { Question } from "../models/question";

export const mockSingleChoiceQuestion: Question = {
  questionId: 1,
  questionText: 'How satisfied are you with the experience?',
  mandatoryInd: true,
  questionType: QuestionType.SingleChoice,
  options: [
    'Very satisfied',
    'Somewhat satisfied',
    'Neither satisfied nor dissatisfied',
    'Somewhat dissatisfied',
    'Very dissatisfied'
  ],
  randomizeOptionsInd: false,
  cards: null,
  programmerNotes: '',
  instructions: ''
};

export const mockNewQuestion: Question = {
  questionId: 2,
  questionText: null,
  mandatoryInd: false,
  questionType: QuestionType.SingleChoice,
  options: null,
  randomizeOptionsInd: false,
  cards: null,
  programmerNotes: null,
  instructions: null
};
