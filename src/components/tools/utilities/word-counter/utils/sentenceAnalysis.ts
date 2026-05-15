/**
 * Sentence length analysis — flags long and very-long sentences.
 */

export interface SentenceResult {
  sentence: string;
  wordCount: number;
  type: 'long' | 'very-long';
}

export function analyzeSentences(sentences: string[]): SentenceResult[] {
  if (sentences.length === 0) return [];

  const results: SentenceResult[] = [];

  for (let i = 0; i < sentences.length; i++) {
    const sentence = sentences[i];
    const wordCount = sentence.trim().split(/\s+/).filter(Boolean).length;

    if (wordCount >= 40) {
      results.push({ sentence, wordCount, type: 'very-long' });
    } else if (wordCount >= 25) {
      results.push({ sentence, wordCount, type: 'long' });
    }
  }

  return results.sort((a, b) => b.wordCount - a.wordCount);
}
