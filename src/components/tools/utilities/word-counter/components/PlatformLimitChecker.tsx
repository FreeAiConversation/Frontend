'use client';

import { memo } from 'react';
import { Signal } from 'lucide-react';
import { PLATFORM_LIMITS } from '../utils/constants';

interface PlatformLimitCheckerProps {
  characterCount: number;
}

export const PlatformLimitChecker = memo(function PlatformLimitChecker({ characterCount }: PlatformLimitCheckerProps) {
  if (characterCount === 0) return null;

  return (
    <div className="border border-white/10 rounded-lg bg-white/[0.02] overflow-hidden">
      <div className="px-5 py-4 border-b border-white/10 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Signal className="w-4 h-4 text-text-dim" />
          <h3 className="text-[14px] font-bold">Platform Limit Checker</h3>
        </div>
        <span className="text-[11px] text-text-dim bg-white/5 px-2 py-1 rounded">
          Characters
        </span>
      </div>
      <div className="p-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
        {PLATFORM_LIMITS.map((platform) => {
          const isOver = characterCount > platform.limit;
          const progress = Math.min((characterCount / platform.limit) * 100, 100);
          return (
            <div key={platform.name} className="space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-[12px] font-medium">
                  {platform.name}
                  {'note' in platform && platform.note && (
                    <span className="ml-1.5 text-[9px] text-text-dim/70 italic">{platform.note}</span>
                  )}
                </span>
                <span className={`text-[11px] font-semibold ${isOver ? 'text-red-400' : 'text-text-dim'}`}>
                  {isOver ? (
                    <span>–{(characterCount - platform.limit).toLocaleString()} over</span>
                  ) : (
                    <span>{characterCount.toLocaleString()} / {platform.limit.toLocaleString()}</span>
                  )}
                </span>
              </div>
              <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-300 ${isOver ? 'bg-red-400/60' : 'bg-white/20'}`}
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
});
