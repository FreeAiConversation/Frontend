/**
 * Weak/filler word detection — optimized with single-pass tokenization.
 */

export const WEAK_WORDS: Record<string, string> = {
  very: 'weakens impact — use a stronger adjective',
  really: 'filler — remove or use a specific word',
  quite: 'vague intensifier — be more specific',
  rather: 'vague — be more direct',
  basically: 'filler — remove it',
  essentially: 'often redundant — try removing it',
  literally: 'overused — remove unless truly literal',
  just: 'minimizing word — remove in most cases',
  simply: 'can sound condescending — remove it',
  actually: 'filler in most contexts — remove it',
  thing: 'vague noun — use a specific word',
  stuff: 'vague — be specific',
  get: 'weak verb — use a more precise verb',
  got: 'weak verb — use a more precise verb',
  maybe: 'hedging — be more direct if possible',
  perhaps: 'hedging — be more direct if possible',
  somehow: 'vague — explain how',
};

// Multi-word phrases need regex (can't be caught by single-token lookup)
export const WEAK_PHRASES: Record<string, string> = {
  'a lot': 'vague quantity — use a number or specific amount',
  'kind of': 'hedging — remove or be more direct',
  'sort of': 'hedging — remove or be more direct',
  'in order to': 'redundant — replace with "to"',
  'due to the fact that': 'wordy — replace with "because"',
};

export interface WeakWordResult {
  word: string;
  count: number;
  tip: string;
}

/**
 * Optimized detection:
 * - Single-word weak words: O(n) single pass using hash map lookup
 * - Multi-word phrases: regex (unavoidable, but only 5 patterns)
 */
export function detectWeakWords(lowerWords: string[], fullText: string): WeakWordResult[] {
  if (lowerWords.length === 0) return [];

  const results: WeakWordResult[] = [];

  // Single-word detection: single pass through tokenized words
  const singleWordCounts = new Map<string, number>();
  for (let i = 0; i < lowerWords.length; i++) {
    const word = lowerWords[i];
    if (WEAK_WORDS[word]) {
      singleWordCounts.set(word, (singleWordCounts.get(word) || 0) + 1);
    }
  }

  for (const [word, count] of Array.from(singleWordCounts)) {
    results.push({ word, count, tip: WEAK_WORDS[word] });
  }

  // Multi-word phrase detection: regex (only 5 patterns, acceptable)
  const lowerText = fullText.toLowerCase();
  for (const [phrase, tip] of Object.entries(WEAK_PHRASES)) {
    const escaped = phrase.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const matches = lowerText.match(new RegExp(`\\b${escaped}\\b`, 'g'));
    if (matches && matches.length > 0) {
      results.push({ word: phrase, count: matches.length, tip });
    }
  }

  return results.sort((a, b) => b.count - a.count);
}
