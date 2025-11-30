import { Component } from '@angular/core';
import { QuestionEditor } from "../question-editor/question-editor";

@Component({
  selector: 'app-survey-builder',
  imports: [QuestionEditor],
  templateUrl: './survey-builder.html',
})
export class SurveyBuilder {

}
