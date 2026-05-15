/**
 * Centralized text tokenization — runs once, shared across all analyzers.
 * Avoids duplicate full-text scans.
 */

export interface TokenizedText {
  words: string[];
  wordCount: number;
  characters: number;
  charactersNoSpaces: number;
  sentences: string[];
  sentenceCount: number;
  paragraphs: number;
  lowerWords: string[];
}

// Use Intl.Segmenter for robust sentence splitting if available
const hasSegmenter = typeof Intl !== 'undefined' && 'Segmenter' in Intl;

function splitSentences(text: string): string[] {
  if (hasSegmenter) {
    try {
      const segmenter = new Intl.Segmenter('en', { granularity: 'sentence' });
      return Array.from(segmenter.segment(text))
        .map((s) => s.segment.trim())
        .filter((s) => s.length > 0);
    } catch {
      // fallback below
    }
  }
  // Fallback: split on sentence-ending punctuation followed by whitespace + capital
  const parts = text.split(/(?<=[.!?])\s+(?=[A-Z])/);
  return parts.map((s) => s.trim()).filter((s) => s.length > 0);
}

export function tokenize(text: string): TokenizedText {
  if (!text.trim()) {
    return {
      words: [],
      wordCount: 0,
      characters: 0,
      charactersNoSpaces: 0,
      sentences: [],
      sentenceCount: 0,
      paragraphs: 0,
      lowerWords: [],
    };
  }

  const words = text.trim().split(/\s+/).filter(Boolean);
  const lowerWords = words.map((w) => w.toLowerCase());
  const sentences = splitSentences(text);
  const paragraphs = Math.max(1, text.split(/\n\s*\n/).filter((p) => p.trim().length > 0).length);

  return {
    words,
    wordCount: words.length,
    characters: text.length,
    charactersNoSpaces: text.replace(/\s/g, '').length,
    sentences,
    sentenceCount: sentences.length || 1,
    paragraphs,
    lowerWords,
  };
}
