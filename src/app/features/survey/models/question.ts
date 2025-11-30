export interface Question {
  questionId: number;
  questionText: string | null;
  mandatoryInd: boolean;
  questionType: number;
  options: string[] | null;
  randomizeOptionsInd: boolean;
  cards: string[] | null;
  programmerNotes: string | null;
  instructions: string | null;
}
