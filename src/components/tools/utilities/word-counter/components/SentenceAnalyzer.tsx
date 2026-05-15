'use client';

import { memo } from 'react';
import { AlignLeft } from 'lucide-react';
import { SentenceResult } from '../utils/sentenceAnalysis';

interface SentenceAnalyzerProps {
  longSentences: SentenceResult[];
}

export const SentenceAnalyzer = memo(function SentenceAnalyzer({ longSentences }: SentenceAnalyzerProps) {
  if (longSentences.length === 0) return null;

  return (
    <div className="border border-white/10 rounded-lg bg-white/[0.02] overflow-hidden">
      <div className="px-5 py-4 border-b border-white/10 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <AlignLeft className="w-4 h-4 text-text-dim" />
          <h3 className="text-[14px] font-bold">Long sentences</h3>
        </div>
        <span className="text-[11px] text-text-dim bg-white/5 px-2 py-1 rounded">
          {longSentences.length} found
        </span>
      </div>
      <div className="p-5 space-y-3">
        {longSentences.slice(0, 8).map((item, index) => {
          const preview = item.sentence.split(/\s+/).slice(0, 8).join(' ') + '…';
          return (
            <div key={index} className="flex items-center gap-3">
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full flex-shrink-0 ${
                item.type === 'very-long'
                  ? 'bg-red-400/10 text-red-400'
                  : 'bg-amber-400/10 text-amber-400/80'
              }`}>
                {item.wordCount} words
              </span>
              <span className="text-[12px] text-text-dim leading-relaxed flex-1 truncate">
                {preview}
              </span>
            </div>
          );
        })}
        {longSentences.length > 8 && (
          <div className="text-[11px] text-text-dim pt-1">
            +{longSentences.length - 8} more long sentences
          </div>
        )}
      </div>
    </div>
  );
});
