import { CircleCheck, ListChecks, SquareMenu, TextCursorInput } from "lucide-angular";

export enum QuestionType {
  SingleChoice = 1,
  MultipleChoice = 2,
  SingleLineInput = 3,
  DropdownList = 4,
}

export const QUESTION_TYPES = [
  { value: QuestionType.SingleChoice, label: 'Single choice', icon: CircleCheck },
  { value: QuestionType.MultipleChoice, label: 'Multiple choice', icon: ListChecks },
  { value: QuestionType.SingleLineInput, label: 'Single-Line input', icon: TextCursorInput },
  { value: QuestionType.DropdownList, label: 'Dropdown list', icon: SquareMenu },
] as const;