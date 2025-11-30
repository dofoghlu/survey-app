import { Meta, StoryObj } from "@storybook/angular";
import { QuestionEditor } from "./question-editor";
import { FormControl, FormGroup } from "@angular/forms";
import { Question } from "../models/question";
import { mockNewQuestion, mockSingleChoiceQuestion } from "./question.test-data";

const meta: Meta<QuestionEditor> = {
  component: QuestionEditor,
};

export default meta;
type Story = StoryObj<QuestionEditor>;

export const Empty: Story = {
  render: () => {

    return {
      props: { questionForm: questionToFormGroup(mockNewQuestion) },
    };
  },
};

export const SingleChoice: Story = {
  render: () => {
    return {
      props: { questionForm: questionToFormGroup(mockSingleChoiceQuestion) },
    };
  },
};

const questionToFormGroup = (question: Question) =>
  new FormGroup({
    questionId: new FormControl(question.questionId),
    questionText: new FormControl(question.questionText),
    mandatoryInd: new FormControl(question.mandatoryInd),
    questionType: new FormControl(question.questionType),
    options: new FormControl(question.options ? question.options.join("\n") : null),
    randomizeOptionsInd: new FormControl(question.randomizeOptionsInd),
  });


