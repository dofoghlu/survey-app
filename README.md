# SurveyApp

## Overview
This app gives researchers a quick way to create and edit surveys. Questions are added in a clear, structured way: pick the type, and enter questions and answers, mark required. This avoids the copy/paste and re-typing that usually happens in a word processor.

## Features
- **Survey List:** View existing surveys and create a survey or edit an existing one.
- **Survey Builder:** Add questions, pick a type, enter options, mark mandatory, and save changes.
- **Survey Preview:** View the survey alongside the editor in a clean, read-only format to see how the script looks as you edit.

## How to Run

1. Install dependencies  
   npm install

2. Start the development server  
   npm start

3. Open the application in your browser:  
   http://localhost:4200

### Storybook

To run Storybook for isolated component development and interaction tests:

1. Start Storybook  
   npm run storybook

2. Open in your browser:  
   http://localhost:6006

### Test Runner
The test runner executes all Storybook tests.  
With Storybook running in another terminal, run:

1. npm run test-storybook

## Assumptions & Decisions

- Adding a question saves the whole survey, but only if the form is valid. Other edits don’t auto-save, so an unsaved-changes indicator and a guard were added to prevent losing work when navigating away.
- Login: the user enters their email and it's stored in local storage. An interceptor adds it to all API requests so no manual setup is required.
- Question deletion and reordering were added to make editing surveys easier.

