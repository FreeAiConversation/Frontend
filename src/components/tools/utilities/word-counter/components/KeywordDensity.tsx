'use client';

import { memo } from 'react';
import { Search } from 'lucide-react';

interface KeywordDensityProps {
  keyword: string;
  onKeywordChange: (value: string) => void;
  count: number;
  density: string | null;
  hasText: boolean;
}

export const KeywordDensity = memo(function KeywordDensity({ keyword, onKeywordChange, count, density, hasText }: KeywordDensityProps) {
  const densityFloat = density ? parseFloat(density) : 0;

  return (
    <div className="border border-white/10 rounded-lg bg-white/[0.02] overflow-hidden">
      <div className="px-5 py-4 border-b border-white/10 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Search className="w-4 h-4 text-text-dim" />
          <h3 className="text-[14px] font-bold">Keyword density</h3>
        </div>
        <span className="text-[11px] text-text-dim bg-white/5 px-2 py-1 rounded">
          ideal: 1–2%
        </span>
      </div>
      <div className="px-5 py-4">
        <div className="flex items-center gap-3">
          <div className="relative flex-1 max-w-xs">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-text-dim" />
            <input
              type="text"
              value={keyword}
              onChange={(e) => onKeywordChange(e.target.value)}
              placeholder="Enter your target keyword..."
              className="w-full pl-9 pr-3 py-2 text-[13px] bg-white/5 border border-white/10 rounded-md focus:outline-none focus:border-white/30 transition-colors"
            />
          </div>
          {keyword.trim() && hasText && count > 0 && (
            <div className="flex items-center gap-4 text-[13px]">
              <span className="text-text-dim">
                Found <span className="font-bold text-white">{count}</span> time{count !== 1 ? 's' : ''}
              </span>
              {density && (
                <span className={`font-bold ${
                  densityFloat < 1 ? 'text-text-dim' :
                  densityFloat <= 2 ? 'text-green-400/80' :
                  densityFloat <= 3 ? 'text-amber-400/80' :
                  'text-red-400/80'
                }`}>
                  {density}% density
                </span>
              )}
            </div>
          )}
          {keyword.trim() && hasText && count === 0 && (
            <span className="text-[13px] text-text-dim/60">Not found in text</span>
          )}
        </div>
        {keyword.trim() && density && (
          <p className="text-[11px] text-text-dim/60 mt-3">
            {densityFloat < 1 && 'Density is low — consider using this keyword more naturally.'}
            {densityFloat >= 1 && densityFloat <= 2 && '✓ Density is in the ideal SEO range (1–2%).'}
            {densityFloat > 2 && densityFloat <= 3 && 'Density is slightly high — ensure it reads naturally.'}
            {densityFloat > 3 && 'Density is too high — this may look like keyword stuffing to search engines.'}
          </p>
        )}
      </div>
    </div>
  );
});
