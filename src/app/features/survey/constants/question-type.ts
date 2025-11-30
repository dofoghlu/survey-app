export enum QuestionType {
  SingleChoice = 1,
  MultipleChoice = 2,
  SingleLineInput = 3,
  DropdownList = 4,
}

export const QUESTION_TYPES = [
  { value: QuestionType.SingleChoice, label: 'Single choice' },
  { value: QuestionType.MultipleChoice, label: 'Multiple choice' },
  { value: QuestionType.SingleLineInput, label: 'Single-Line input' },
  { value: QuestionType.DropdownList, label: 'Dropdown list' },
] as const;