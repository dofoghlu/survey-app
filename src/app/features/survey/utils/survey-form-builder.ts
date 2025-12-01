import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Survey, SurveyDto } from '../models/survey';
import { Question } from '../models/question';
import { QuestionType } from '../constants/question-type';
import { questionOptionsValidator } from '../survey-builder/question-options-validator';

export const createSurveyForm = (fb: FormBuilder, survey?: Survey): FormGroup => {
  const questionsArray = fb.array(
    survey?.questions?.map((q) => createQuestionFormGroup(fb, q)) || [],
  );

  if (questionsArray.length === 0) {
    questionsArray.push(createQuestionFormGroup(fb));
  }

  return fb.group({
    id: [survey?.id || 0],
    title: [survey?.title || ''],
    description: [survey?.description || ''],
    questions: questionsArray,
  });
};

export const createQuestionFormGroup = (fb: FormBuilder, question?: Question): FormGroup =>
  fb.group({
    questionId: [question?.questionId || 0],
    questionText: [question?.questionText || null, Validators.required],
    mandatoryInd: [question?.mandatoryInd || false],
    questionType: [question?.questionType || QuestionType.SingleChoice],
    options: [
      question?.options?.map((opt) => `- ${opt}`).join('\n') || '',
      questionOptionsValidator,
    ],
    randomizeOptionsInd: [question?.randomizeOptionsInd || false],
    cards: [question?.cards || []],
    programmerNotes: [question?.programmerNotes || null],
    instructions: [question?.instructions || null],
  });

export const formToSurveyDto = (form: FormGroup, surveyId: string | null): SurveyDto => {
  const v = form.value;

  return {
    id: surveyId,
    title: v.title ?? null,
    description: v.description ?? null,
    questions: v.questions
      ? v.questions.map((q: any, i: number) => ({
          ...q,
          questionId: i,
          options: parseQuestionOptions(q.options),
        }))
      : null,
  };
};

export const parseQuestionOptions = (text: string) =>
  text
    ?.split('\n')
    .map(l => l.trim())
    .filter(l => l.startsWith('-') && l.length > 1)
    .map(l => l.slice(1).trim());
