import { QuestionType } from "../constants/question-type";
import { Question } from "../models/question";

export function createQuestion(params: Partial<Question>): Question {
  return {
    questionId: params.questionId ?? 0,
    questionText: params.questionText ?? '',
    mandatoryInd: params.mandatoryInd ?? false,
    questionType: params.questionType ?? QuestionType.SingleChoice,
    options: params.options ?? [],
    randomizeOptionsInd: params.randomizeOptionsInd ?? false,
    cards: params.cards ?? null,
    programmerNotes: params.programmerNotes ?? '',
    instructions: params.instructions ?? ''
  };
}

export function createQuestionList(count: number): Question[] {
  return Array.from({ length: count }, (_, i) => 
    createQuestion({
      questionId: i + 1,
      questionText: `Question ${i + 1}`,
      questionType: i % 2 === 0 ? QuestionType.SingleChoice : QuestionType.MultipleChoice,
      options: Array.from({ length: 3 }, (_, j) => `Option ${j + 1}`),
    })
  );
}

export const mockSingleChoice = createQuestion({
  questionId: 10,
  questionText: 'Single choice question',
  questionType: QuestionType.SingleChoice,
  options: ['Option 1', 'Option 2', 'Option 3', 'Option 4'],
});

export const mockMultipleChoice = createQuestion({
  questionId: 11,
  questionText: 'Multiple choice question',
  questionType: QuestionType.MultipleChoice,
  options: ['Option 1', 'Option 2', 'Option 3'],
});

export const mockSingleLineInput = createQuestion({
  questionId: 12,
  questionText: 'Single-line input question',
  questionType: QuestionType.SingleLineInput,
});

export const mockDropdownList = createQuestion({
  questionId: 13,
  questionText: 'Dropdown list question',
  questionType: QuestionType.DropdownList,
  options: ['Option 1', 'Option 2', 'Option 3'],
});

export const mockNewQuestion = createQuestion({
  questionId: 0,
  questionText: '',
  questionType: QuestionType.SingleChoice,
});

export const mockQuestionList = createQuestionList(5);
