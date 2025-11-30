import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Survey } from '../models/survey';
import { Question } from '../models/question';
import { QuestionType } from '../constants/question-type';

export const createSurveyForm = (fb: FormBuilder, survey?: Survey): FormGroup => {
  const questionsArray = fb.array(
    survey?.questions?.map((q) => createQuestionFormGroup(fb, q)) || []
  );

  if (questionsArray.length === 0) {
    questionsArray.push(createQuestionFormGroup(fb));
  }

  return fb.group({
    surveyId: [survey?.id || 0],
    surveyTitle: [survey?.title || '', Validators.required],
    questions: questionsArray,
  });
};

export const createQuestionFormGroup = (fb: FormBuilder, question?: Question): FormGroup =>
  fb.group({
    questionId: [question?.questionId || 0],
    questionText: [question?.questionText || null, Validators.required],
    mandatoryInd: [question?.mandatoryInd || false],
    questionType: [question?.questionType || QuestionType.SingleChoice],
    options: [question?.options?.map((opt) => `- ${opt}`).join('\n') || ''],
    randomizeOptionsInd: [question?.randomizeOptionsInd || false],
    cards: [question?.cards || []],
    programmerNotes: [question?.programmerNotes || null],
    instructions: [question?.instructions || null],
  });
