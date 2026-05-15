'use client';

import { useMemo } from 'react';
import { tokenize, TokenizedText } from '../utils/tokenizer';
import { computeFleschScore, getReadabilityLabel } from '../utils/readability';
import { detectWeakWords, WeakWordResult } from '../utils/weakWords';
import { analyzeSentences, SentenceResult } from '../utils/sentenceAnalysis';

export interface TextStats {
  words: number;
  characters: number;
  charactersNoSpaces: number;
  sentences: number;
  paragraphs: number;
  readingTime: string;
  speakingTime: string;
  readability: string;
  fleschScore: number;
}

function formatTime(minutes: number): string {
  if (minutes < 1) return '< 1 min';
  if (minutes < 60) return `${Math.ceil(minutes)} min`;
  const hrs = Math.floor(minutes / 60);
  const mins = Math.ceil(minutes % 60);
  return `${hrs}h ${mins}m`;
}

export interface TextAnalysis {
  stats: TextStats;
  weakWords: WeakWordResult[];
  totalWeakWordCount: number;
  longSentences: SentenceResult[];
}

/**
 * Central analysis hook — tokenizes once, derives all metrics.
 * Uses useMemo to avoid recalculation unless text changes.
 */
export function useTextAnalysis(text: string, deferredText: string): TextAnalysis {
  // Stats use live text for instant feedback
  const stats = useMemo<TextStats>(() => {
    const tokens = tokenize(text);
    if (tokens.wordCount === 0) {
      return {
        words: 0, characters: 0, charactersNoSpaces: 0,
        sentences: 0, paragraphs: 0,
        readingTime: '0 min', speakingTime: '0 min',
        readability: '—', fleschScore: 0,
      };
    }

    const fleschScore = computeFleschScore(tokens.lowerWords, tokens.wordCount, tokens.sentenceCount);

    return {
      words: tokens.wordCount,
      characters: tokens.characters,
      charactersNoSpaces: tokens.charactersNoSpaces,
      sentences: tokens.sentenceCount,
      paragraphs: tokens.paragraphs,
      readingTime: formatTime(tokens.wordCount / 225),
      speakingTime: formatTime(tokens.wordCount / 140),
      readability: getReadabilityLabel(fleschScore),
      fleschScore,
    };
  }, [text]);

  // Expensive analyses use deferred text to avoid blocking typing
  const { weakWords, totalWeakWordCount, longSentences } = useMemo(() => {
    const tokens = tokenize(deferredText);
    const weak = detectWeakWords(tokens.lowerWords, deferredText);
    const long = analyzeSentences(tokens.sentences);
    return {
      weakWords: weak,
      totalWeakWordCount: weak.reduce((acc, w) => acc + w.count, 0),
      longSentences: long,
    };
  }, [deferredText]);

  return { stats, weakWords, totalWeakWordCount, longSentences };
}
