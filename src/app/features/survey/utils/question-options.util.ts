export const parseQuestionOptions = (text: string) =>
  text
    ?.split('\n')
    .map(l => l.trim())
    .filter(l => l.startsWith('-') && l.length > 1)
    .map(l => l.slice(1).trim());