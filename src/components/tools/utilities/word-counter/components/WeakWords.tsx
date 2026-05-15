'use client';

import { memo } from 'react';
import { AlertTriangle } from 'lucide-react';
import { WeakWordResult } from '../utils/weakWords';

interface WeakWordsProps {
  weakWords: WeakWordResult[];
  totalCount: number;
}

export const WeakWords = memo(function WeakWords({ weakWords, totalCount }: WeakWordsProps) {
  if (weakWords.length === 0) return null;

  return (
    <div className="border border-white/10 rounded-lg bg-white/[0.02] overflow-hidden">
      <div className="px-5 py-4 border-b border-white/10 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 text-amber-400/80" />
          <h3 className="text-[14px] font-bold">Weak & filler words</h3>
        </div>
        <span className="text-[11px] font-semibold text-amber-400/80 bg-amber-400/10 px-2 py-1 rounded">
          {totalCount} instance{totalCount !== 1 ? 's' : ''}
        </span>
      </div>
      <div className="p-5 space-y-2">
        {weakWords.map((item) => (
          <div key={item.word} className="flex items-center gap-3">
            <span className="text-[13px] font-semibold w-28 truncate text-amber-300/90">
              {item.word}
            </span>
            <span className="text-[11px] bg-white/5 px-1.5 py-0.5 rounded text-text-dim">
              ×{item.count}
            </span>
            <span className="text-[12px] text-text-dim flex-1">
              {item.tip}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
});
