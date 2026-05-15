'use client';

import { useMemo } from 'react';

export interface KeywordDensityResult {
  count: number;
  density: string | null;
}

/**
 * Keyword density hook — caches regex compilation.
 * Only recomputes when keyword or text changes.
 */
export function useKeywordDensity(keyword: string, text: string, wordCount: number): KeywordDensityResult {
  return useMemo(() => {
    const trimmed = keyword.trim();
    if (!trimmed || !text) return { count: 0, density: null };

    const escaped = trimmed.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(`\\b${escaped}\\b`, 'gi');
    const matches = text.match(regex) || [];
    const count = matches.length;

    const density = wordCount > 0 && count > 0
      ? ((count / wordCount) * 100).toFixed(1)
      : null;

    return { count, density };
  }, [keyword, text, wordCount]);
}
