/**
 * Readability analysis with syllable caching for performance.
 */

// Syllable cache — avoids recalculating for repeated words
const syllableCache = new Map<string, number>();
const MAX_CACHE_SIZE = 5000;

export function countSyllables(word: string): number {
  const w = word.toLowerCase().replace(/[^a-z]/g, '');
  if (w.length <= 3) return 1;

  const cached = syllableCache.get(w);
  if (cached !== undefined) return cached;

  const matches = w.match(/[aeiouy]+/g);
  let count = matches ? matches.length : 1;
  if (w.endsWith('e')) count--;
  const result = Math.max(1, count);

  // Evict oldest entries if cache is too large
  if (syllableCache.size >= MAX_CACHE_SIZE) {
    const firstKey = syllableCache.keys().next().value;
    if (firstKey) syllableCache.delete(firstKey);
  }
  syllableCache.set(w, result);

  return result;
}

export function getReadabilityLabel(score: number): string {
  if (score >= 90) return 'Very Easy';
  if (score >= 70) return 'Easy';
  if (score >= 60) return 'Standard';
  if (score >= 50) return 'Fairly Hard';
  if (score >= 30) return 'Difficult';
  return 'Very Difficult';
}

export function computeFleschScore(words: string[], wordCount: number, sentenceCount: number): number {
  if (wordCount === 0 || sentenceCount === 0) return 0;

  let totalSyllables = 0;
  for (let i = 0; i < words.length; i++) {
    totalSyllables += countSyllables(words[i]);
  }

  const score = Math.round(
    206.835 - 1.015 * (wordCount / sentenceCount) - 84.6 * (totalSyllables / wordCount)
  );

  return Math.max(0, Math.min(100, score));
}
